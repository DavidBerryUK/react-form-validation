import IRule from "../interfaces/IRule";
import RuleBase from "../base/RuleBase";
import FieldModel from "../../base/FieldModel";
import RuleResponse from "../models/RuleResponse";

export default class RuleMinLength extends RuleBase implements IRule {
  private readonly minLength: number;

  constructor(minLength: number, customMessage?: string) {
    super(customMessage);
    this.minLength = minLength;
  }

  isValid(field: FieldModel): RuleResponse {
    if (this.isValueEmpty(field.value)) {
      return this.pass();
    }

    if (field.valueAsString.length >= this.minLength) {
      return this.pass();
    }

    return this.fail(`must be greater or equal to ${this.minLength} characters`);
  }
}
