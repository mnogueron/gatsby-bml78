/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');
const dateFns = require('date-fns');

const BuildStatus = {
  SUCCESS: 'success',
  ERROR: 'error',
};

const netlify = {
  name: 'Netlify',
  logo: 'https://media.dev.to/cdn-cgi/image/width=320,height=320,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Forganization%2Fprofile_image%2F141%2F786e7a76-3019-4b70-9d33-663ffdbb1d8e.png',
  url: 'https://app.netlify.com',
  appUrl: `https://app.netlify.com/sites/${process.env['SITE_NAME']}`,
};

const getCommitUrl = sha => `${process.env['REPOSITORY_URL']}/commit/${sha}`;

const getPayload = (buildStatus, git) => {
  const title = buildStatus === 'success' ? `Build deployed` : `Build failed`;
  const status = buildStatus === 'success' ? `deployed` : `failed to deploy`;
  const color = buildStatus === 'success' ? 0x1f8b4c : 0x992d22;

  const deployUrl =
    process.env['CONTEXT'] === 'production'
      ? process.env['URL']
      : process.env['DEPLOY_URL'];

  return {
    username: netlify.name,
    avatar_url: netlify.logo,
    embeds: [
      {
        /*author: {
          name: netlify.name,
          url: netlify.url,
          icon_url: netlify.logo,
        },*/
        url: netlify.appUrl,
        color,
        title,
        description: `[${
          process.env['SITE_NAME']
        }](${deployUrl}) ${status} at ${dateFns.format(new Date(), 'P')}.`,
        fields: [
          {
            name: 'Build ID',
            value: process.env['BUILD_ID'],
          },
          {
            name: 'Context',
            value: process.env['CONTEXT'],
          },
          {
            name: 'Branch',
            value: process.env['BRANCH'],
          },
          {
            name: 'Deployed Commit',
            value: `[${process.env['COMMIT_REF']}](${getCommitUrl(
              process.env['COMMIT_REF']
            )})`,
          },
          {
            details: 'Content',
            value: git.commits
              .map(
                c =>
                  `* ${c.message} - @${c.committer.name} [${c.sha.slice(
                    0,
                    7
                  )}(${getCommitUrl(c.sha)}))]`
              )
              .join('\n'),
          },
          {
            name: 'Logs',
            value: `${netlify.appUrl}/deploys/${process.env['DEPLOY_ID']}`,
          },
        ],
      },
    ],
  };
};

const Discord = {
  sendBuildReport: async (buildStatus, utils) => {
    const {git} = utils;
    try {
      const webhook = process.env['DISCORD_WEBHOOK_URL'];
      if (!webhook) {
        console.log('No webhook set. Skipping.');
        return;
      }
      await axios.post(webhook, getPayload(buildStatus, git));

      switch (buildStatus) {
        case BuildStatus.ERROR:
          console.log('Build status (fail) sent to Discord');
          break;
        case BuildStatus.SUCCESS:
          console.log('Build status (success) sent to Discord');
          break;
      }
    } catch (err) {
      console.error(err);
    }
  },
};

module.exports = {
  Discord,
  BuildStatus,
};
