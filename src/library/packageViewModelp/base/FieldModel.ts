import { Record } from "immutable";
import EnumFieldDataType from "../enums/EnumFieldDataType";
import FieldSchema from "./FieldSchema";
import FieldValidation from "../validation/models/FieldValidation";
import IFieldValidation from "../validation/interfaces/IFieldValidation";

export type FieldTypeString = string | undefined;
export type FieldTypeNumber = number | undefined;
export type FieldTypeBoolean = boolean | undefined;
export type FieldTypeDate = Date | undefined;
export type FieldValueType = FieldTypeString | FieldTypeNumber | FieldTypeDate | FieldTypeBoolean;

interface FieldViewModelProps {
  dataType: EnumFieldDataType;
  caption: string;
  fieldName: string;
  value: FieldValueType;
  error: string;
  help: string;
  validation: IFieldValidation | undefined;
  active: boolean;
}

const FieldViewModelRecord = Record<FieldViewModelProps>({
  dataType: EnumFieldDataType.string,
  caption: "",
  fieldName: "",
  error: "",
  help: "",
  value: undefined,
  validation: undefined,
  active: true,
});

export default class FieldModel extends FieldViewModelRecord {
  constructor(
    fieldName: string,
    dataType: EnumFieldDataType,
    caption: string,
    value: FieldValueType,
    error: string,
    help: string,
    validation: IFieldValidation,
  ) {
    super({
      dataType: dataType,
      fieldName: fieldName,
      caption: caption,
      value: value,
      error: error,
      help: help,
      validation: validation,
    });
  }

  /**
   * Factory method to create a FieldModel from a schema.
   */
  public static fromSchema(schema: FieldSchema, value: FieldValueType): FieldModel {
    return new FieldModel(
      schema.fieldName, // Field name
      schema.dataType, // Data Type, e.g. String, Number, Boolean, Date
      schema.caption, // Caption displayed on the UI
      value, // Actual value
      "", // Error message
      "", // help message
      new FieldValidation(schema.rules), // validation rules
    );
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

  get dataType(): EnumFieldDataType {
    return this.get("dataType");
  }

  get active(): boolean {
    return this.get("active");
  }

  /**
   * Retrieves the numeric value if applicable.
   */
  get valueAsNumber(): FieldTypeNumber {
    return this.value as FieldTypeNumber;
  }

  /**
   * Retrieves the boolean value if applicable.
   */
  get valueAsBoolean(): FieldTypeBoolean {
    return this.value as FieldTypeBoolean;
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

  cloneAsInactive(): FieldModel {
    return this.set("active", false);
  }

  cloneAsActive(): FieldModel {
    return this.set("active", true);
  }

  /**
   * Creates a clone of the model with updated help text.
   */
  cloneWithHelp(newHelp: string): FieldModel {
    return this.set("help", newHelp) as FieldModel;
  }
}
