import { Map } from "immutable";
import FieldModel from "./FieldModel";
import ViewModelSchema from "./ViewModelSchema";

export default abstract class BaseViewModel<T extends BaseViewModel<any>> {
  /****************************************************/
  /* Actual Field Values                              */
  /****************************************************/
  readonly fields: Map<string, FieldModel>;

  public constructor(fields: Map<string, FieldModel>) {
    this.fields = fields;
  }

  static create<T extends BaseViewModel<any>>(this: new (fields: Map<string, FieldModel>) => T, fields: Map<string, FieldModel>): T {
    var model = new this(fields);
    model = model.onInitialise(model);
    return model;
  }

  static createInitialFields<TSchema extends ViewModelSchema>(
    schema: TSchema,
    initialValues: Partial<Record<keyof TSchema["fields"], any>>,
  ): Map<string, FieldModel> {
    let fields = Map<string, FieldModel>();
    // Define the type for keys of initialValues
    type InitialValueKeys = keyof typeof initialValues;

    // Get the keys of the RsvpFormViewModel's fields schema
    const rsvpFieldKeys = Object.keys(schema.fields) as Array<keyof typeof schema.fields>;

    rsvpFieldKeys.forEach((key) => {
      const fieldKey = key; // No need for type assertion, already a keyof

      const fieldSchema = schema.fields[fieldKey];

      // Ensure the key exists in initialValues
      if (key in initialValues) {
        const fieldValue = initialValues[key as InitialValueKeys]; // Now we can safely access it
        const field = FieldModel.fromSchema(fieldSchema, fieldValue);
        fields = fields.set(field.fieldName, field);
      }
    });

    return fields;
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
    model = this.onFieldUpdated(model, oldField, field);
    return model;
  }

  /****************************************************/
  /* Validate All                                     */
  /****************************************************/
  cloneWithValidateAll(): this {
    // validate form by assinging 'new' field values to every field in the form
    var form = new (this.constructor as any)(this.fields);
    this.fields.forEach((field) => {
      form = form.cloneWithField(field.cloneWithValue(field.value));
      form = form.onFieldUpdated(form, field, field);
    });
    return form;
  }

  /****************************************************/
  /* Validate All                                     */
  /****************************************************/
  cloneWithClearAll(): this {
    // validate form by assinging 'new' field values to every field in the form
    var form = new (this.constructor as any)(this.fields);

    this.fields.forEach((keyField) => {
      var oldField = this.fields.get(keyField.fieldName);
      var field = form.fields.get(keyField.fieldName);
      form = form.cloneWithField(field.cloneAndClear());
      form = form.onFieldUpdated(form, oldField, field);
    });

    return form;
  }

  /****************************************************/
  /* Events
  /****************************************************/
  abstract onFieldUpdated(model: T, oldField: FieldModel, newField: FieldModel): T;
  abstract onInitialise(model: T): T;
}
