import type {OnError, OnSuccess} from '@netlify/build';
import DiscordService, {BuildStatus} from './DiscordService';

export const onSuccess: OnSuccess = async () =>
  await DiscordService.sendBuildReport(BuildStatus.SUCCESS);

export const onError: OnError = async () =>
  await DiscordService.sendBuildReport(BuildStatus.ERROR);
