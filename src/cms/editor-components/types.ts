export interface EditorComponentField {
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
}

type ListWidget = {
  name: string;
  label: string;
  label_singular?: string;
  widget: 'list';
  fields?: EditorComponentField[];
  required?: boolean;
  default?: any;
};

export interface EditorComponentOptions {
  id: string;
  label: string;
  fields:
    | ListWidget
    | {
        name: string;
        label: string;
        label_singular?: string;
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
