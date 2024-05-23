/* eslint-disable @typescript-eslint/no-var-requires */
const {Discord, BuildStatus} = require('./DiscordService');

module.exports = {
  onSuccess: async () => await Discord.sendBuildReport(BuildStatus.SUCCESS),
  onError: async () => await Discord.sendBuildReport(BuildStatus.ERROR),
};
