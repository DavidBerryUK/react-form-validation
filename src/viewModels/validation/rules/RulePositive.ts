import IRule from "../interfaces/IRule";
import RuleBase from "../base/RuleBase";
import FieldModel from "../../base/FieldModel";
import RuleResponse from "../models/RuleResponse";

export default class RulePositive extends RuleBase implements IRule {
  private readonly allowZero: boolean;

  constructor(allowZero: boolean, customMessage?: string) {
    super(customMessage);
    this.allowZero = allowZero;
  }

  isValid(field: FieldModel): RuleResponse {
    if (this.isValueEmpty(field.value)) {
      return this.pass();
    }

    const number = Number(field.value);

    if (!isNaN(number)) {
      if (this.allowZero) {
        if (number >= 0) {
          return this.pass();
        }
      } else {
        if (number > 0) {
          return this.pass();
        }
      }
    }

    if (this.allowZero) {
      return this.fail(`must be positive or zero`);
    }
    return this.fail(`must be positive`);
  }
}
