import axios from 'axios';
import {
  CustomField,
  EventType,
  Event,
  OrderEvent,
  CustomFieldType,
  Option,
  Product,
  FormType,
  Registration,
} from './types';
import HelloAssoSpreadsheetHandler from './HelloAssoSpreadsheetHandler';

const helloAsso = {
  name: 'HelloAsso',
  logo: 'https://cdn.helloasso.com/img/logos/helloasso-44ac081445ee450f9906e9399ed0c7da.png?resize=fill:140:140',
  url: 'https://www.helloasso.com/associations/badminton-maisons-laffitte',
};

const supportedEventTypes = [EventType.ORDER];

const parseCustomField = (customField: CustomField) => {
  if (customField.name.includes('Date de retrait')) {
    return `:mailbox: *Date de retrait :* **${customField.answer}**`;
  }
  if (customField.name.includes('Demande complémentaire')) {
    return `:information: *Demande complémentaire :*\n${customField.answer.slice(
      0,
      1024
    )}`;
  }

  switch (customField.type) {
    case CustomFieldType.DATE:
      return `:alarm_clock: *${customField.name} :* **${customField.answer}**`;
    case CustomFieldType.FREE_TEXT:
      return `:pencil: *${customField.name} :* **\n${customField.answer.slice(
        0,
        1024
      )}**`;
    case CustomFieldType.TEXT_INPUT:
      return `:pencil: *${customField.name} :* **${customField.answer}**`;
    case CustomFieldType.PHONE:
      return `:telephone: *${customField.name} :* **${customField.answer}**`;
    case CustomFieldType.ZIPCODE:
      return `:map: *${customField.name} :* **${customField.answer}**`;
    case CustomFieldType.FILE:
      return `:file_folder: [*${customField.name}*](${customField.answer})`;
    case CustomFieldType.CHOICE_LIST:
      return `:card_box: *${customField.name} :* **${customField.answer}**`;
    case CustomFieldType.NUMBER:
      return `:1234: *${customField.name} :* **${customField.answer}**`;
    case CustomFieldType.YES_NO:
      return `:grey_question: *${customField.name} :* **${customField.answer}**`;
    default:
      return undefined;
  }
};

const parseOption = (option: Option) => {
  return [
    `:control_knobs: *Option :* **${option.name}**`,
    ...((option.customFields || []).map(parseCustomField) || []),
  ];
};

const getOrderEventEmbeds = (
  order: OrderEvent,
  spreadsheetLink: string | undefined
) => {
  const {data} = order;
  const {formSlug, formType, payer, items} = data;

  switch (formType) {
    case FormType.SHOP: {
      const products = (items as Product[]).reduce<{
        [key: string]: {name: string; quantity: number; value: string};
      }>((acc, item) => {
        const value = [
          ...(item.customFields || []).map(parseCustomField),
          ...(item.options || []).flatMap(parseOption),
        ]
          .filter(Boolean)
          .join('\n');
        if (acc[item.name]) {
          acc[item.name] = {
            ...item,
            quantity: acc[item.name].quantity + 1,
            value:
              acc[item.name].value === value
                ? acc[item.name].value
                : acc[item.name].value + '\n\n' + value,
          };
        } else {
          acc[item.name] = {
            name: item.name,
            quantity: 1,
            value,
          };
        }

        return acc;
      }, {});

      const url = `${helloAsso.url}/boutiques/${formSlug}`;

      return [
        {
          color: 0x1f8b4c,
          title: `Nouvel achat`,
          description:
            `Un nouvel achat vient d'être effectué sur [${formSlug}](${url})` +
            (spreadsheetLink
              ? ` ([:bar_chart: suivi de commande](${spreadsheetLink}))`
              : ''),
          fields: [
            {
              name: 'Acheteur',
              value: `${payer.lastName.toUpperCase()} ${payer.firstName}`,
            },
            {
              name: 'Total',
              value: `:moneybag: ${data.amount.total / 100} €`,
            },
            ...Object.values(products).map(p => ({
              name: p.name,
              value: [`*Quantité :* **${p.quantity}**`, p.value]
                .filter(Boolean)
                .join('\n\n'),
            })),
          ],
        },
      ];
    }
    case FormType.EVENT: {
      const registrations = (items as Registration[]).map(item => {
        const value = [
          ...(item.customFields || []).map(parseCustomField),
          ...(item.options || []).map(parseOption),
        ]
          .filter(Boolean)
          .join('\n');

        return {
          name: item.name,
          value: [
            `:badminton: *Participant :* **${item.user.lastName.toUpperCase()} ${
              item.user.firstName
            }**`,
            value,
          ]
            .filter(Boolean)
            .join('\n\n'),
        };
      });

      const url = `${helloAsso.url}/evenements/${formSlug}`;

      return [
        {
          color: 0x1f8b4c,
          title: `Nouvelle inscription`,
          description:
            `Une nouvelle inscription vient d'être effectuée pour l'événement [${formSlug}](${url})` +
            (spreadsheetLink
              ? ` ([:bar_chart: suivi d'inscription](${spreadsheetLink}))`
              : ''),
          fields: [
            {
              name: 'Acheteur',
              value: `${payer.lastName.toUpperCase()} ${payer.firstName}`,
            },
            {
              name: 'Total',
              value: `:moneybag: ${data.amount.total / 100} €`,
            },
            ...Object.values(registrations).map(p => ({
              name: p.name,
              value: p.value,
            })),
          ],
        },
      ];
    }
    default:
      throw new Error('Not a supported form type for HelloAsso webhook.');
  }
};

const getPayload = async (body: Event, spreadsheetLink: string | undefined) => {
  let embeds = undefined;

  switch (body.eventType) {
    case EventType.ORDER:
      embeds = getOrderEventEmbeds(body as OrderEvent, spreadsheetLink);
      break;
    default:
      break;
  }

  if (!embeds) {
    throw new Error(
      'No valid embed associated to event for HelloAsso webhook.'
    );
  }

  return {
    username: helloAsso.name,
    avatar_url: helloAsso.logo,
    embeds,
  };
};

const getDiscordWebhook = (body: Event) => {
  return (
    Netlify.env.get(
      `DISCORD_WEBHOOK_URL_HELLO_ASSO_${body.data.formSlug
        .replaceAll('-', '_')
        .toUpperCase()}`
    ) || Netlify.env.get('DISCORD_WEBHOOK_URL_HELLO_ASSO')
  );
};

const HelloAssoHandler = async (req: Request) => {
  if (req.method !== 'POST') {
    throw new Error('Not a valid method for HelloAsso webhook.');
  }

  const body = await req.json();
  if (!supportedEventTypes.includes(body.eventType)) {
    throw new Error(
      `'${body.eventType}' is not a supported event for HelloAsso integration.`
    );
  }

  const discordWebhook = getDiscordWebhook(body);
  if (!discordWebhook) {
    throw new Error('No webhook set for the HelloAsso X Discord.');
  }

  const spreadsheetLink = await HelloAssoSpreadsheetHandler(body);
  const payload = await getPayload(body, spreadsheetLink);
  await axios.post(discordWebhook, payload);
};

export default HelloAssoHandler;
