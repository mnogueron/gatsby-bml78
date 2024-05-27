import {execSync} from 'child_process';
import {Octokit} from '@octokit/rest';
import {simpleGit} from 'simple-git';
import * as dateFns from 'date-fns';

const owner = 'mnogueron';
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

  // TODO if so, use that PR, delete the files in common and push the new ones
  if (existingPull) {
    console.log('Found existing PR with id: ', existingPull.number);
    // Search common files to remove them from the PR and avoid merge issues
    const commonFiles = existingFiles.filter(f =>
      modifiedFilePaths.includes(f.filename)
    );
    // TODO remove existing files in PR
    const branchName = existingPull.head.label.split(':')[1];
    console.log('Switching to branch');
    // TODO push new files
    /* empty */
  } else {
    const branchName = `auto-ic/import-${dateFns.format(
      new Date(),
      'dd-MM-yyyy'
    )}`;
    console.log('Create new branch', branchName);
    await git.checkoutLocalBranch(branchName);
    // TODO if not
    //  create a new branch
    //  create a new PR
  }
};

run();
