import FieldSchema from "./FieldSchema";

export type SchemaBase = {
  [key: string]: FieldSchema; // Define a type for your schema
};

export default abstract class ViewModelSchema {
  abstract fields: SchemaBase;

  protected populateFieldNames() {
    Object.keys(this.fields).forEach((key) => {
      const field = this.fields[key];
      if (field instanceof FieldSchema) {
        field.fieldName = key;
      }
    });
  }
}
