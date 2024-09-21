import {Config, Context} from '@netlify/functions';
import HelloAssoHandler from './WebhookHandlers/HelloAssoHandler';

export default async (req: Request, context: Context) => {
  const hookid = new URL(req.url).searchParams.get('id');
  const helloAssoWebhookId = Netlify.env.get('HELLO_ASSO_WEBHOOK_ID');

  try {
    if (hookid === helloAssoWebhookId) {
      await HelloAssoHandler(req);
      return new Response('Webhook handled!');
    }

    return new Response(
      JSON.stringify({message: 'Sorry, no access for you.'}),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (e: any) {
    console.error(e);
    return new Response(JSON.stringify({message: e.message}), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};

export const config: Config = {
  path: '/webhooks',
  preferStatic: true,
};
