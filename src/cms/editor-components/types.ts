import {EditorComponentField} from 'decap-cms-core';

export interface EditorComponentOptions {
  id: string;
  label: string;
  fields: {
    name: string;
    label: string;
    widget: string;
    /**
     * Used if widget === "list" to create a flat array
     */
    field?: EditorComponentField;
    /**
     * Used if widget === "list" to create an array of objects
     */
    fields?: EditorComponentField[];
    options?: Array<{label: string; value: string} | string>;
    required?: boolean;
    default?: any;
  }[];
  pattern: RegExp;
  allow_add?: boolean;
  fromBlock: (match: RegExpMatchArray) => any;
  toBlock: (data: any) => string;
  toPreview: (data: any) => string;
}
