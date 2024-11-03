import FieldModel from "../../base/FieldModel";
import IRule from "../interfaces/IRule";
import RuleBase from "../base/RuleBase";
import RuleResponse from "../models/RuleResponse";

export default class RuleMaxLength extends RuleBase implements IRule {
  private readonly maxLength: number;

  constructor(maxLength: number, customMessage?: string) {
    super(customMessage);
    this.maxLength = maxLength;
  }

  isValid(field: FieldModel): RuleResponse {
    if (this.isValueEmpty(field.value)) {
      return this.pass();
    }

    if (field.valueAsString.length <= this.maxLength) {
      return this.pass();
    }

    return this.fail(`must be less or equal to ${this.maxLength} characters`);
  }
}
