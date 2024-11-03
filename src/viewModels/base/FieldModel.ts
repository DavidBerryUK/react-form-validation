import { Record } from "immutable";

export type fieldInputType = "text" | "number";
export type fieldTypeString = string | undefined;
export type fieldTypeNumber = number | undefined;
export type fieldTypeDate = Date | undefined;
export type fieldValueType = fieldTypeString | fieldTypeNumber | fieldTypeDate;

export type fieldSchema = { fieldName: string; type: fieldInputType; caption: string };

interface FieldViewModelProps {
  inputType: fieldInputType;
  caption: string;
  fieldName: string;
  value: fieldValueType;
  error: string;
  help: string;
}

const FieldViewModelRecord = Record<FieldViewModelProps>({
  inputType: "text",
  caption: "",
  fieldName: "",
  error: "",
  help: "",
  value: undefined,
});

export default class FieldModel extends FieldViewModelRecord {
  constructor(dataType: fieldInputType, fieldName: string, caption: string, value: fieldValueType, help: string = "", error: string = "") {
    super({ inputType: dataType, fieldName, caption, value, help, error });
  }

  public static fromSchema(schema: fieldSchema, value: fieldValueType): FieldModel {
    return new FieldModel(schema.type, schema.fieldName!, schema.caption, value);
  }

  get fieldName(): string {
    return this.get("fieldName");
  }

  get caption(): string {
    return this.get("caption");
  }

  get error(): string {
    return this.get("error");
  }

  get help(): string {
    return this.get("help");
  }

  get valueAsNumber(): number | undefined {
    return this.get("value") as number | undefined;
  }

  get value(): fieldValueType {
    return this.get("value");
  }

  get valueAsString(): string {
    return this.get("value") as string;
  }

  cloneWithValue(newValue: fieldValueType): FieldModel {
    return this.set("value", newValue) as FieldModel;
  }

  cloneWithHelp(newValue: string): FieldModel {
    return this.set("help", newValue) as FieldModel;
  }

  cloneWithError(newValue: string): FieldModel {
    return this.set("error", newValue) as FieldModel;
  }
}

export class TextFieldModel extends FieldModel {
  constructor(fieldName: string, caption: string, value?: fieldValueType) {
    super("text", fieldName, caption, value ?? "");
  }
}
