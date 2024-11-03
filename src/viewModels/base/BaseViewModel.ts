import { fieldInputType } from "./FieldModel";

export type FormSchemaInitialise = {
  [key: string]: { type: fieldInputType; caption: string };
};

export default class ViewModelBase {
  /**
   *
   * @param config List of field details, caption values and the field type
   * @returns a Schema object of type T, e.g. ContactFormSchema
   */
  static createSchemaFromConfig<T extends Record<string, { type: fieldInputType; caption: string }>>(config: FormSchemaInitialise): T {
    // Convert the Schema Initialise data into field schemas
    const schema = Object.fromEntries(Object.entries(config).map(([key, { type, caption }]) => [key, { type, caption, fieldName: key }])) as unknown as T; // Cast to unknown first, then to T

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
