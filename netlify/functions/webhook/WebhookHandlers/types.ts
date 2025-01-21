export enum EventType {
  ORDER = 'Order',
  FORM = 'Form',
  PAYMENT = 'Payment',
  ORGANIZATION = 'Organization',
}

export enum PriceCategory {
  FIXED = 'Fixed',
  FREE = 'Free',
  PAY_WHAT_YOU_WANT = 'Pwyw',
}

export enum CustomFieldType {
  DATE = 'Date',
  FREE_TEXT = 'FreeText',
  TEXT_INPUT = 'TextInput',
  PHONE = 'Phone',
  ZIPCODE = 'Zipcode',
  FILE = 'File',
  CHOICE_LIST = 'ChoiceList',
  NUMBER = 'Number',
  YES_NO = 'YesNo',
}

export type CustomStringFieldData = {
  type:
    | CustomFieldType.DATE
    | CustomFieldType.FREE_TEXT
    | CustomFieldType.TEXT_INPUT
    | CustomFieldType.PHONE
    | CustomFieldType.ZIPCODE
    | CustomFieldType.FILE
    | CustomFieldType.CHOICE_LIST
    | CustomFieldType.NUMBER;
  answer: string;
};

export type CustomYesNoFieldData = {
  type: CustomFieldType.YES_NO;
  answer: 'Oui' | 'Non';
};

type CustomFieldData = CustomStringFieldData | CustomYesNoFieldData;

export type CustomField = {
  id: number;
  name: string;
} & CustomFieldData;

export type ItemFixedPricing = {
  priceCategory: PriceCategory.FIXED;
  discount: {code: string; amount: number};
};

export type ItemFreePricing = {
  priceCategory: PriceCategory.FREE;
  discount: {code: string; amount: number};
};

export type ItemPwywPricing = {
  priceCategory: PriceCategory.PAY_WHAT_YOU_WANT;
  minAmount: number;
};

export type ItemPricing = ItemFixedPricing | ItemFreePricing | ItemPwywPricing;

export type Option = {
  name: string;
  amount: number;
  priceCategory: PriceCategory.FREE | PriceCategory.FIXED;
  customFields?: CustomField[];
  optionId: number;
};

export enum ItemType {
  PRODUCT = 'Product',
  REGISTRATION = 'Registration',
}

export type BaseItem = {
  name: string;
  customFields?: CustomField[];
  options?: Option[];
  qrCode: string;
  tierDescription: string;
  tierId: number;
  id: number;
  amount: number;
  initialAmount: number;
  state: 'Processed';
};

export type ItemFixedPrice = BaseItem & ItemFixedPricing;
export type ItemFreePrice = BaseItem & ItemFreePricing;
export type ItemPwywPrice = BaseItem & ItemPwywPricing;

export type Item = ItemFixedPrice | ItemFreePrice | ItemPwywPrice;

export type Product = Item & {
  type: ItemType.PRODUCT;
};

export type Registration = Item & {
  user: {
    firstName: string;
    lastName: string;
  };
  ticketUrl: string;
  type: ItemType.REGISTRATION;
};

export type DiscountableItem = Item & {
  discount?: {code: string; amount: number};
};

export enum FormType {
  SHOP = 'Shop',
  EVENT = 'Event',
}

export type FormShopData = {
  items: Product[];
  formType: FormType.SHOP;
};

export type FormEventData = {
  items: Registration[];
  formType: FormType.EVENT;
};

export type FormData = FormShopData | FormEventData;

export type OrderEvent = {
  data: {
    payer: {
      email: string;
      country: string;
      firstName: string;
      lastName: string;
    };
    amount: {total: number; vat: number; discount: number};
    id: number;
    date: string;
    formSlug: string;
    organizationName: string;
    organizationSlug: string;
    organizationType: string;
    organizationIsUnderColucheLaw: boolean;
    meta: {
      createdAt: string;
      updatedAt: string;
    };
    isAnonymous: boolean;
    isAmountHidden: boolean;
  } & FormData;
  eventType: EventType.ORDER;
};

export type Event = OrderEvent;
