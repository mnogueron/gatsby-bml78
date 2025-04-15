import FormData from 'form-data';
import {Readable} from 'stream';
import {helloAsso} from './constants';

export enum WebhookErrorType {
  INVALID_METHOD = 'INVALID_METHOD',
  NON_SUPPORTED_EVENT = 'NON_SUPPORTED_EVENT',
  NO_WEBHOOK = 'NO_WEBHOOK',
  DEFAULT_ERROR = 'DEFAULT_ERROR',
}

export class WebhookError extends Error {
  type: WebhookErrorType = WebhookErrorType.DEFAULT_ERROR;

  constructor(message: string, type?: WebhookErrorType) {
    super(message); // Call the constructor of the base class `Error`
    this.name = 'WebhookError'; // Set the error name to your custom error class name
    this.type = type || WebhookErrorType.DEFAULT_ERROR;
    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, WebhookError.prototype);
  }
}

const notifyErrorContent = async (
  body: unknown,
  err: unknown,
  discordErrorWebhook: string
) =>
  new Promise((resolve, reject) => {
    const formData = new FormData();
    const filename = `error_log_${new Date().getTime()}.json`;
    formData.append('username', helloAsso.name);
    formData.append('avatar_url', helloAsso.logo);
    formData.append(
      'payload_json',
      JSON.stringify({
        embeds: [
          {
            color: 0x992d22,
            title: `Notification error`,
            description:
              err instanceof WebhookError &&
              err.type === WebhookErrorType.NON_SUPPORTED_EVENT
                ? `Unsupported event`
                : (err as Error).message,
            fields: [
              {
                name: 'Stacktrace',
                value: '```' + (err as Error).stack + '```',
              },
            ],
          },
        ],
        attachments: [
          {
            id: 0,
            description: 'Error log',
            filename,
          },
        ],
      }),
      {contentType: 'application/json'}
    );
    const errorFileStream = Readable.from(JSON.stringify(body, null, 2));
    formData.append('files[0]', errorFileStream, {
      filename,
      contentType: 'application/json',
    });

    return formData.submit(discordErrorWebhook, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });

export const notifyError = async (body: unknown, err: unknown) => {
  const discordErrorWebhook = Netlify.env.get(
    'DISCORD_WEBHOOK_URL_HELLO_ASSO_ERROR'
  );
  if (!discordErrorWebhook) {
    throw new WebhookError(
      'No webhook set for the HelloAsso error channel.',
      WebhookErrorType.NO_WEBHOOK
    );
  }

  await notifyErrorContent(body, err, discordErrorWebhook);
};
