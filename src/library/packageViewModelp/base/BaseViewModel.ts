import { Map } from "immutable";
import FieldModel, { FieldSchema } from "./FieldModel";
import IRule from "../validation/interfaces/IRule";
import EnumFieldDataType from "../enums/EnumFieldDataType";

export type FormSchemaInitialise = {
  [key: string]: { dataType: EnumFieldDataType; caption: string; rules?: Array<IRule> };
};

export default abstract class ViewModelBase {
  /****************************************************/
  /* Actual Field Values                              */
  /****************************************************/
  readonly fields: Map<string, FieldModel>;

  constructor(fields: Map<string, FieldModel>) {
    this.fields = fields;
  }

  /**
   * Creates a schema based on a configuration object
   * @param config - Configuration for schema initialization
   * @returns Schema of type T
   */
  static createSchemaFromConfig<T extends Record<string, FieldSchema>>(config: FormSchemaInitialise): T {
    const schema = Object.fromEntries(
      Object.entries(config).map(([key, config]) => [
        key,
        {
          fieldName: key,
          dataType: config.dataType,
          caption: config.caption,
          rules: config.rules,
        },
      ]),
    ) as unknown as T;

    const schemaKeys: Array<keyof T> = Object.keys(schema) as Array<keyof T>;
    schemaKeys.forEach((key) => {
      if (!schema[key]) {
        throw new Error(`Missing property in schema: ${String(key)}`);
      }
    });

    return schema;
  }

  /****************************************************/
  /* Clone Object                                     */
  /****************************************************/
  clone(): this {
    return new (this.constructor as any)(this.fields);
  }

  /****************************************************/
  /* Modify Field Values                              */
  /****************************************************/
  cloneWithField(field: FieldModel): this {
    var oldField = this.fields.get(field.fieldName)!;
    var model = new (this.constructor as any)(this.fields.set(field.fieldName, field));
    this.onFieldUpdated(oldField, field);
    return model;
  }

  /****************************************************/
  /* Events
  /****************************************************/
  abstract onFieldUpdated(oldField: FieldModel, newField: FieldModel): void;
}
