import axios from 'axios';
import {
  CustomField,
  EventType,
  Event,
  OrderEvent,
  CustomFieldType,
  Option,
} from './types';

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
    (option.customFields || [])
      .map(parseCustomField)
      .filter(Boolean)
      .map(v => `\t${v}`),
  ].join('\n');
};

const getOrderEventEmbeds = (order: OrderEvent) => {
  const {data} = order;
  const {formSlug, formType, payer, items} = data;

  const url = `${helloAsso.url}/${
    formType === 'Shop' ? 'boutiques' : undefined
  }/${formSlug}`;

  const products = items.reduce<{
    [key: string]: {name: string; quantity: number; value: string};
  }>((acc, item) => {
    const value = [
      ...(item.customFields || []).map(parseCustomField),
      ...(item.options || []).map(parseOption),
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

  return [
    {
      color: 0x1f8b4c,
      title: `Nouvel achat`,
      description: `Un nouvel achat vient d'être effectué sur [${formSlug}](${url})`,
      fields: [
        {
          name: 'Acheteur',
          value: `${payer.lastName.toUpperCase()} ${payer.firstName}`,
        },
        ...Object.values(products).map(p => ({
          name: p.name,
          value: `*Quantité :* **${p.quantity}**` + '\n\n' + p.value,
        })),
      ],
    },
  ];
};

const getPayload = async (body: Event) => {
  let embeds: any[] = [];

  switch (body.eventType) {
    case EventType.ORDER:
      embeds = getOrderEventEmbeds(body as OrderEvent);
      break;
    default:
      break;
  }

  return {
    username: helloAsso.name,
    avatar_url: helloAsso.logo,
    embeds,
  };
};

const HelloAssoHandler = async (req: Request) => {
  if (req.method !== 'POST') {
    throw new Error('Not a valid method for HelloAsso webhook.');
  }

  const discordWebhook = Netlify.env.get('DISCORD_WEBHOOK_URL_HELLO_ASSO');
  if (!discordWebhook) {
    throw new Error('No webhook set for the HelloAsso X Discord.');
  }

  const body = await req.json();
  if (!supportedEventTypes.includes(body.eventType)) {
    throw new Error(
      `'${body.eventType}' is not a supported event for HelloAsso integration.`
    );
  }

  const payload = await getPayload(body);
  await axios.post(discordWebhook, payload);
};

export default HelloAssoHandler;
