import {GoogleAuth} from 'google-auth-library';
import {google} from 'googleapis';
import {Event, EventType, FormType, OrderEvent, Product} from './types';

const credentials = JSON.parse(Netlify.env.get('DRIVE_SHEET_CREDENTIALS'));

const auth = new GoogleAuth({
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
  credentials,
});

const service = google.sheets({version: 'v4', auth});

const fetchSpreadsheetId = async (
  body: OrderEvent
): Promise<string | undefined> => {
  const response = await service.spreadsheets.values.get({
    spreadsheetId: '1Bg9TnQsTZpU3rxEx43FosW5zHr7HH6u1LNBU-MYUmHs',
    range: 'A2:B',
  });
  const link = response.data.values?.find(v => v[0] === body.data.formSlug);
  if (!link) {
    return undefined;
  }

  return link[1].match(/spreadsheets\/[^/]*\/([^/]*)/)[1] || undefined;
};

// TODO create spreadsheet
const prepareSpreadsheets = async (body: OrderEvent) => {
  const response = await service.spreadsheets.create();
};

export const handleSheetUpdate = async (body: OrderEvent) => {
  const {data} = body;
  const {items, payer} = data;

  // TODO handle options
  const rows = (items as Product[]).map(item => {
    return [
      '',
      data.id + '',
      data.date,
      item.state === 'Processed' ? 'Validé' : 'En cours',
      payer.lastName,
      payer.firstName,
      payer.email,
      '',
      'Carte bancaire',
      item.name,
      item.initialAmount / 1000,
      item.discount?.code,
      item.discount?.amount / 1000,
      ...(item.customFields?.map(cf => cf.answer) || []),
    ];
  });

  const spreadsheetId = await fetchSpreadsheetId(body);

  // TODO handle creating new spreadsheet
  if (!spreadsheetId) {
    return;
  }

  const resource = {
    majorDimension: 'ROWS',
    range: 'Commandes!B1:Q',
    values: rows,
  };
  await service.spreadsheets.values.append({
    spreadsheetId,
    range: 'Commandes!B1:Q',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: resource,
  });

  return `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;
};

const HelloAssoOrderHandler = async (body: Event) => {
  if (
    body.eventType === EventType.ORDER &&
    body.data.formType === FormType.SHOP
  ) {
    return await handleSheetUpdate(body as OrderEvent);
  }
};

export default HelloAssoOrderHandler;
