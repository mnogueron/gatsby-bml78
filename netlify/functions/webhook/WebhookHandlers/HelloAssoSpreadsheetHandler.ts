import {GoogleAuth} from 'google-auth-library';
import {google} from 'googleapis';
import {
  DiscountableItem,
  Event,
  EventType,
  FormType,
  OrderEvent,
  Product,
  Registration,
} from './types';
import * as dateFns from 'date-fns';

const toBase26 = (decimal: number): string => {
  if (decimal <= 0) {
    return 'A';
  }

  let out = '';
  let decimalLoop = decimal;

  while (decimalLoop > 0) {
    out = String.fromCharCode(((decimalLoop - 1) % 26) + 97) + out;
    decimalLoop = Math.floor((decimalLoop - 1) / 26);
  }

  return out.toUpperCase();
};

const credentials = JSON.parse(
  Netlify.env.get('DRIVE_SHEET_CREDENTIALS') || ''
);

const auth = new GoogleAuth({
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
  credentials,
});

const service = google.sheets({version: 'v4', auth});

type SpreadsheetData = {
  id: string;
  formType: FormType;
  sheet: string;
  skippedColumns: number;
};

const getFormTypeFromString = (formType: string) => {
  switch (formType) {
    case 'Shop':
      return FormType.SHOP;
    case 'Event':
      return FormType.EVENT;
    default:
      return undefined;
  }
};

/**
 * Fetch the spreadsheet data linked to the HelloAsso event
 * @param body
 */
const fetchSpreadsheetData = async (
  body: OrderEvent
): Promise<SpreadsheetData | undefined> => {
  const response = await service.spreadsheets.values.get({
    spreadsheetId: '1Bg9TnQsTZpU3rxEx43FosW5zHr7HH6u1LNBU-MYUmHs',
    range: 'A2:D',
  });
  const handlerRow = response.data.values?.find(
    v => v[0] === body.data.formSlug
  );
  if (!handlerRow) {
    return undefined;
  }

  const id = handlerRow[1].match(/spreadsheets\/[^/]*\/([^/]*)/)[1];
  const formType = getFormTypeFromString(handlerRow[2]);
  const sheet = handlerRow[3] || 'Feuille 1';
  const skippedColumns = parseInt(handlerRow[4]) || 0;

  if (!id || !formType) {
    return undefined;
  }

  return {id, formType, sheet, skippedColumns};
};

// TODO create spreadsheet
const prepareSpreadsheets = async (body: OrderEvent) => {
  const response = await service.spreadsheets.create();
};

// TODO add support for skipped columns
const eventDataMapper = (body: OrderEvent, skippedColumns: number) => {
  const {data} = body;
  const {items, payer} = data;
  // TODO handle options
  return (items as Registration[]).map(item => {
    const {discount} = item as DiscountableItem;
    return [
      ...Array.from({length: skippedColumns}).map(() => ''),
      data.id + '',
      dateFns.format(new Date(data.date), 'dd/MM/yyy HH:mm:ss'),
      item.state === 'Processed' ? 'Validé' : 'En cours',
      payer.lastName,
      payer.firstName,
      payer.email,
      item.user.firstName,
      item.user.lastName,
      'Carte bancaire',
      item.name,
      item.initialAmount / 100,
      discount?.code,
      discount?.amount ? discount?.amount / 100 : '',
      ...(item.customFields?.map(cf => cf.answer) || []),
    ];
  });
};

const orderDataMapper = (body: OrderEvent, skippedColumns: number) => {
  const {data} = body;
  const {items, payer} = data;
  // TODO handle options
  return (items as Product[]).map(item => {
    const {discount} = item as DiscountableItem;
    return [
      ...Array.from({length: skippedColumns}).map(() => ''),
      data.id + '',
      dateFns.format(new Date(data.date), 'dd/MM/yyy HH:mm:ss'),
      item.state === 'Processed' ? 'Validé' : 'En cours',
      payer.lastName,
      payer.firstName,
      payer.email,
      '',
      'Carte bancaire',
      item.name,
      item.initialAmount / 100,
      discount?.code,
      discount?.amount ? discount?.amount / 100 : '',
      ...(item.customFields?.map(cf => cf.answer) || []),
    ];
  });
};

export const handleSheetUpdate = async (
  body: OrderEvent,
  spreadsheetData: SpreadsheetData
) => {
  let rows = [];
  switch (spreadsheetData.formType) {
    case FormType.SHOP:
      rows = orderDataMapper(body, spreadsheetData.skippedColumns);
      break;
    case FormType.EVENT:
      rows = eventDataMapper(body, spreadsheetData.skippedColumns);
      break;
  }

  const rangeLimit = toBase26(rows.length);
  const range = `${spreadsheetData.sheet}!A1:${rangeLimit}`; // TODO get length of rows to knows what's the limit of the spreadsheet

  const resource = {
    majorDimension: 'ROWS',
    range,
    values: rows,
  };
  await service.spreadsheets.values.append({
    spreadsheetId: spreadsheetData.id,
    range,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: resource,
  });

  return `https://docs.google.com/spreadsheets/d/${spreadsheetData.id}`;
};

const HelloAssoSpreadsheetHandler = async (body: Event) => {
  if (body.eventType === EventType.ORDER) {
    const spreadsheetData = await fetchSpreadsheetData(body);
    // TODO handle creating new spreadsheet
    if (!spreadsheetData) {
      return;
    }
    return await handleSheetUpdate(body as OrderEvent, spreadsheetData);
  }
};

export default HelloAssoSpreadsheetHandler;
