import {execSync} from 'child_process';
import {Octokit} from '@octokit/rest';
import {simpleGit, CleanOptions} from 'simple-git';
import * as dateFns from 'date-fns';
import Discord from './DiscordNotifier/index.js';
import {ASSETS_FOLDER, META_FILEPATH, RESULT_FOLDER} from './constants.js';
import yargs from 'yargs';

const argv = yargs(process.argv).option('d', {
  alias: 'dry-pr',
  default: false,
  describe: 'Dry run',
  type: 'boolean',
}).argv;

const owner = 'mnogueron'; // TODO replace that with proper gt git owner
const repo = 'gatsby-bml78';

const octokit = new Octokit({
  auth: process.env['GITHUB_AUTH_TOKEN'],
  userAgent: 'badml-ic-auto-importer',
});

// init git
const options = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6,
  trimmed: false,
};
const git = simpleGit(options);

const getICFileName = f => f.replace(`${RESULT_FOLDER}/`, '');
const isICFileName = f => f.startsWith(RESULT_FOLDER);
const isICMetadata = f => f === META_FILEPATH || f.startsWith(ASSETS_FOLDER);

const commitICChanges = async () => {
  const status = await git.status();
  let updatedICs = [];
  let createdICs = [];
  const modifiedPromises = status.modified.filter(isICFileName).map(async f => {
    const icFilename = getICFileName(f);
    updatedICs.push(icFilename);
    console.log('Committing update for IC', icFilename);
    await git.add(['../' + f]); // TODO use absolute path
    return git.commit(`feat: update IC result for ${icFilename}`);
  });
  const createdPromises = [...status.created, ...status.not_added]
    .filter(isICFileName)
    .map(async f => {
      const icFilename = getICFileName(f);
      createdICs.push(icFilename);
      console.log('Committing import for IC', icFilename);
      await git.add(['../' + f]); // TODO use absolute path
      return git.commit(`feat: import IC result for ${icFilename}`);
    });

  await Promise.all([...modifiedPromises, ...createdPromises]);

  if (status.modified.filter(isICMetadata)) {
    console.log('Committing metadata updates');
    await git.add(['../static/assets', './ICImporter/metas/ic.json']); // TODO use absolute path
    await git.commit('feat: update metadata files');
  }

  return {createdICs, updatedICs};
};

const run = async () => {
  await git.checkout('master');
  await git.clean(CleanOptions.FORCE);
  await git.fetch();
  await git.pull();
  const existingBranches = await git.branchLocal();

  // Generate IC
  try {
    execSync('node ./extract-all-ics.js');
  } catch (e) {
    console.error('Could not extract IC');
    process.exit(1);
  }

  // Get modified files
  const status = await git.status();
  const modifiedFilePaths = status.files
    .map(f => f.path)
    .filter(p => p.startsWith('src/pages'));
  const icFiles = modifiedFilePaths.filter(p => p.startsWith(RESULT_FOLDER));

  if (modifiedFilePaths.length === 0) {
    console.log('No IC has been imported, cleaning current branch.');
    git.clean(CleanOptions.FORCE);
    return;
  }

  // Get all PRs
  const {data: pulls} = await octokit.rest.pulls.list({
    owner,
    repo,
    state: 'open',
  });

  // Only consider PRs created with the same owner
  const sameRepoPRs = pulls.filter(p => p.head.repo.owner.login === owner);

  // Search for an existing PR
  let i = 0;
  let existingPull = undefined;
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
    }

    i++;
  }

  if (existingPull) {
    console.log('Found existing PR with id: ', existingPull.number);
    const branchName = existingPull.head.label.split(':')[1];

    console.log('Add files before stashing...');
    await git.add(['../src', './ICImporter/metas/ic.json']); // TODO use absolute path

    console.log('Stashing modifications...');
    await git.stash();

    console.log('Switching to branch...');
    await git.checkout(branchName);
    await git.rebase();

    console.log('Unstashing and overwrite branch modifications');
    await git.raw('cherry-pick', '-n', '-m1', '-Xtheirs', 'stash');

    const status = await git.status();
    if (status.files.length === 0) {
      console.log(`No file has been modified since PR ${existingPull.number}`);
      await git.checkout('master');
      return;
    }

    // Split commit for every change
    const {createdICs, updatedICs} = await commitICChanges();
    await git.push('origin', branchName);
    await git.checkout('master');

    if (!argv['dry-pr']) {
      console.log('Updating PR', existingPull.number);
      const {data: pr} = await octokit.rest.pulls.update({
        owner,
        repo,
        pull_number: existingPull.number,
        body: `
### Description
Auto-import of IC results.

### Imported ICs
${icFiles.map(p => '- [x] : ' + getICFileName(p)).join('\n')} 
      `,
      });

      // Report to Discord
      await Discord.notifyICPR(pr.html_url, createdICs, updatedICs, true);
    }
  } else {
    const date = dateFns.format(new Date(), 'dd-MM-yyyy');
    const branchName = `auto-ic/import-${date}`;

    // Delete branch if already exist
    if (existingBranches.all.includes(branchName)) {
      console.log(`"${branchName}" already exists, deleting branch.`);
      await git.deleteLocalBranch(branchName, true);
      try {
        await git.push('origin', branchName, ['--delete']);
      } catch {
        console.error(
          `Could not delete remote branch. It's likely due to a deleted PR.`
        );
      }
    }

    console.log('Creating new branch', branchName);
    await git.checkoutLocalBranch(branchName);

    // Split commit for every change
    const {createdICs, updatedICs} = await commitICChanges();
    await git.push('origin', branchName);
    await git.checkout('master');

    if (!argv['dry-pr']) {
      // Create new PR
      console.log('Creating new PR');
      const {data: pr} = await octokit.rest.pulls.create({
        owner,
        repo,
        head: `${owner}:${branchName}`,
        base: 'master',
        title: `[Feat] Import IC - ${date}`,
        body: `
### Description
Auto-import of IC results.

### Imported ICs
${icFiles.map(p => '- [x] : ' + getICFileName(p)).join('\n')} 
      `,
      });

      // Report to Discord
      await Discord.notifyICPR(pr.html_url, createdICs, updatedICs, false);
    }
  }
};

run();
