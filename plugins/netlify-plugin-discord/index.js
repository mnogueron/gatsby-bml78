/* eslint-disable @typescript-eslint/no-var-requires */
const {Discord, BuildStatus} = require('./DiscordService');

module.exports = {
  onSuccess: async ({utils}) =>
    await Discord.sendBuildReport(BuildStatus.SUCCESS, utils),
  onError: async ({utils}) =>
    await Discord.sendBuildReport(BuildStatus.ERROR, utils),
};
