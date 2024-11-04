import { Map } from "immutable";
import FieldModel, { FieldInputType, FieldSchema } from "./FieldModel";
import IRule from "../validation/interfaces/IRule";

export type FormSchemaInitialise = {
  [key: string]: { type: FieldInputType; caption: string; rules?: Array<IRule> };
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
      Object.entries(config).map(([key, config]) => [key, { fieldName: key, type: config.type, caption: config.caption, rules: config.rules }]),
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
