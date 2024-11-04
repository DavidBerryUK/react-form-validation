import IRule from "../interfaces/IRule";
import RuleBase from "../base/RuleBase";
import RuleResponse from "../models/RuleResponse";
import FieldModel from "../../base/FieldModel";

export default class RuleMaxValue extends RuleBase implements IRule {
  private maxValue: number;

  constructor(maxValue: number, customMessage?: string) {
    super(customMessage);
    this.maxValue = maxValue;
  }

  isValid(field: FieldModel): RuleResponse {
    if (this.isValueEmpty(field.value)) {
      return this.pass();
    }

    const number = Number(field.valueAsString);

    if (isNaN(number)) {
      return this.fail("must be a valid number");
    }

    if (number > this.maxValue) {
      return this.fail(`must be equal or less than ${this.maxValue}`);
    }

    return this.pass();
  }
}
