import { Map } from "immutable";
import FieldModel, { FieldSchema } from "./FieldModel";
import IRule from "../validation/interfaces/IRule";
import EnumFieldDataType from "../enums/EnumFieldDataType";

export type FormSchemaInitialise = {
  [key: string]: { dataType: EnumFieldDataType; caption: string; rules?: Array<IRule> };
};

export default class ViewModelBase {
  /****************************************************/
  /* Actual Field Values                              */
  /****************************************************/
  readonly fields: Map<string, FieldModel>;

  constructor(fields: Map<string, FieldModel>) {
    this.fields = fields;
  }

  /**
   *
   * @param config List of field details, caption values and the field type
   * @returns a Schema object of type T, e.g. ContactFormSchema
   */
  static createSchemaFromConfig<T extends Record<string, FieldSchema>>(config: FormSchemaInitialise): T {
    // Convert the Schema Initialise data into field schemas
    const schema = Object.fromEntries(
      Object.entries(config).map(([key, config]) => [
        key,
        {
          fieldName: key, // the field name
          dataType: config.dataType, // the data type, e.g. String, Number, Date, Boolean
          caption: config.caption, // the UI text
          rules: config.rules, // the validation rules
        },
      ]),
    ) as unknown as T; // Cast to unknown first, then to T

    // Validate that every property of the schema is populated
    const schemaKeys: Array<keyof T> = Object.keys(schema) as Array<keyof T>;
    schemaKeys.forEach((key) => {
      if (!schema[key]) {
        throw new Error(`Missing property in schema: ${String(key)}`);
      }
    });

    return schema;
  }
}
