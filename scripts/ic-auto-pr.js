import {execSync} from 'child_process';
import {Octokit} from '@octokit/rest';
import {simpleGit} from 'simple-git';
import * as dateFns from 'date-fns';

const owner = 'mnogueron'; // TODO replace that with proper gt git owner
const repo = 'gatsby-bml78';

const octokit = new Octokit({
  auth: process.env['GITHUB_AUTH_TOKEN'],
  userAgent: 'badml-ic-auto-importer',
});

const run = async () => {
  // init git
  const options = {
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6,
    trimmed: false,
  };
  const git = simpleGit(options);
  await git.fetch();
  await git.pull();
  const existingBranches = await git.branchLocal();

  // Generate IC
  try {
    execSync('node ./extractICs.js');
  } catch (e) {
    console.error('Could not extract IC');
    process.exit(1);
  }

  // Get modified files
  const status = await git.status();
  const modifiedFilePaths = status.files
    .map(f => f.path)
    .filter(p => p.startsWith('src/pages'));
  const icFiles = modifiedFilePaths.filter(p =>
    p.startsWith('src/pages/results')
  );

  if (modifiedFilePaths.length === 0) {
    console.log('No IC has been imported, cleaning current branch.');
    // TODO clean branch
    // git.clean();
    return;
  }

  // Get all PRs
  const {data: pulls} = await octokit.rest.pulls.list({
    owner,
    repo,
    state: 'all', // TODO just consider open PRs
  });

  // Only consider PRs created with the same owner
  const sameRepoPRs = pulls.filter(p => p.head.repo.owner.login === owner);

  console.log(pulls[1]);

  // Search for an existing PR
  let i = 0;
  let existingPull = undefined;
  let existingFiles = [];
  while (i < sameRepoPRs.length && !existingPull) {
    const pull = sameRepoPRs[i];
    const pull_number = pull.number;
    // Get all files in a PR
    const {data: files} = await octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number,
    });

    if (files.some(f => modifiedFilePaths.includes(f.filename))) {
      existingPull = pull;
      existingFiles = files;
    }

    i++;
  }

  if (existingPull) {
    console.log('Found existing PR with id: ', existingPull.number);
    const branchName = existingPull.head.label.split(':')[1];

    // Search common files to remove them from the PR and avoid merge issues
    /*const commonFiles = existingFiles.filter(f =>
      modifiedFilePaths.includes(f.filename)
    );*/

    console.log('Stashing modifications');
    await git.stash();

    console.log('Switching to branch');
    await git.checkoutLocalBranch(branchName);

    console.log('Unstashing and overwrite branch modifications');
    await git.raw('cherry-pick', '-n', '-m1', '-Xtheirs', 'stash');

    // TODO split in multiple message per IC
    await git.add(['../src', 'icUrls.json']);
    await git.commit('feat: import IC');
    await git.push('origin', branchName);

    // TODO update PR
    console.log('Updating PR', existingPull.number);
    const pr = await octokit.rest.pulls.update({
      owner,
      repo,
      pull_number: existingPull.number,
      body: `
### Description
Auto-import of IC results.

### Imported ICs
${icFiles
  .map(p => '- [x] : ' + p.replace('src/pages/results/', ''))
  .join('\n')} 
      `,
    });

    console.log(pr);

    // TODO report to Slack
  } else {
    const date = dateFns.format(new Date(), 'dd-MM-yyyy');
    const branchName = `auto-ic/import-${date}`;

    // Delete branch if already exist
    if (existingBranches.all.includes(branchName)) {
      console.log(`"${branchName}" already exists, deleting branch.`);
      await git.deleteLocalBranch(branchName, true);
      await git.push('origin', branchName, ['--delete']);
    }

    console.log('Creating new branch', branchName);
    await git.checkoutLocalBranch(branchName);

    // TODO split in multiple message per IC
    await git.add(['../src', 'icUrls.json']);
    await git.commit('feat: import IC');
    await git.push('origin', branchName);

    // Create new PR
    console.log('Creating new PR');
    const pr = await octokit.rest.pulls.create({
      owner,
      repo,
      head: `${owner}:${branchName}`,
      base: 'master',
      title: `[Feat] Import IC - ${date}`,
      body: `
### Description
Auto-import of IC results.

### Imported ICs
${icFiles
  .map(p => '- [x] : ' + p.replace('src/pages/results/', ''))
  .join('\n')} 
      `,
    });

    console.log(pr);
    // TODO report to Slack
  }
};

run();
