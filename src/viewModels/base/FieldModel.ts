import { Record } from "immutable";
import FieldValidation from "../validation/models/FieldValidation";
import IRule from "../validation/interfaces/IRule";
import IFieldValidation from "../validation/interfaces/IFieldValidation";

export type FieldInputType = "text" | "number";
export type FieldTypeString = string | undefined;
export type FieldTypeNumber = number | undefined;
export type FieldTypeDate = Date | undefined;
export type FieldValueType = FieldTypeString | FieldTypeNumber | FieldTypeDate;

export type FieldSchema = {
  fieldName: string;
  type: FieldInputType;
  caption: string;
  rules: IRule[];
};

interface FieldViewModelProps {
  inputType: FieldInputType;
  caption: string;
  fieldName: string;
  value: FieldValueType;
  error: string;
  help: string;
  validation: IFieldValidation | undefined;
}

const FieldViewModelRecord = Record<FieldViewModelProps>({
  inputType: "text",
  caption: "",
  fieldName: "",
  error: "",
  help: "",
  value: undefined,
  validation: undefined,
});

export default class FieldModel extends FieldViewModelRecord {
  constructor(dataType: FieldInputType, fieldName: string, caption: string, value: FieldValueType, error = "", help = "", validation?: IFieldValidation) {
    super({ inputType: dataType, fieldName, caption, value, error, help, validation });
  }

  /**
   * Factory method to create a FieldModel from a schema.
   */
  public static fromSchema(schema: FieldSchema, value: FieldValueType): FieldModel {
    return new FieldModel(schema.type, schema.fieldName, schema.caption, value, "", "", new FieldValidation(schema.rules));
  }

  get fieldName(): string {
    return this.get("fieldName");
  }

  get caption(): string {
    return this.get("caption");
  }

  get help(): string {
    return this.get("help");
  }

  get validation(): FieldValidation {
    return this.get("validation") as FieldValidation;
  }

  get value(): FieldValueType {
    return this.get("value");
  }

  /**
   * Retrieves the numeric value if applicable.
   */
  get valueAsNumber(): FieldTypeNumber {
    return this.value as FieldTypeNumber;
  }

  /**
   * Retrieves the string value if applicable.
   */
  get valueAsString(): string {
    return (this.value as FieldTypeString) ?? "";
  }

  /**
   * Creates a clone of the model with a new value, updating the validation error message accordingly.
   */
  cloneWithValue(newValue: FieldValueType): FieldModel {
    var newField = this.set("value", newValue);
    this.validation?.validate(newField);
    const errorMessage = this.validation?.validationMessage || "";
    return newField.set("error", errorMessage) as FieldModel;
  }

  /**
   * Creates a clone of the model with updated help text.
   */
  cloneWithHelp(newHelp: string): FieldModel {
    return this.set("help", newHelp) as FieldModel;
  }
}
