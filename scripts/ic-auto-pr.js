import {execSync} from 'child_process';
import {Octokit} from '@octokit/rest';
import {simpleGit} from 'simple-git';

const octokit = new Octokit({
  auth: 'auth',
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

  // TODO Generate IC
  /* try {
    execSync('node ./scripts/extractICs.js');
  } catch (e) {
    console.error('Could not extract IC');
    process.exit(1);
  }*/

  // TODO Extract all ICs that have been created
  // Get modified files
  const status = await git.status();
  const filePaths = status.files
    .map(f => f.path)
    .filter(p => p.startsWith('src/pages'));

  /*if (filePaths.length === 0) {
    console.log('No IC has been imported, cleaning current branch.');
    // TODO clean branch
    // git.clean();
    return;
  }*/

  // TODO Check all PRs on github if one already exist with one of the file updated
  // Get all PRs
  const {data: pulls} = await octokit.rest.pulls.list({
    owner: 'mnogueron',
    repo: 'gatsby-bml78',
    state: 'all',
  });

  // Search for an existing PR
  let i = 0;
  let existingPR = undefined;
  while (i < pulls.length && !existingPR) {
    const pull_number = pulls[i].number;
    // Get all files in a PR
    const {data: files} = await octokit.rest.pulls.listFiles({
      owner: 'mnogueron',
      repo: 'gatsby-bml78',
      pull_number,
    });

    if (files.some(f => filePaths.includes(f.filename))) {
      existingPR = pull_number;
      console.log('Found existing PR with id: ', existingPR);
    }

    i++;
  }

  // TODO if so, use that PR, delete the files in common and push the new ones
  if (existingPR) {
    /* empty */
  } else {
    // TODO if not
    //  create a new branch
    //  create a new PR
  }
};

run();
