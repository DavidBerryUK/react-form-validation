import FieldModel from "../../base/FieldModel";

export default interface IFieldValidation {
  countAll: number;
  validationMessage: string;
  validate(field: FieldModel): void;
}
