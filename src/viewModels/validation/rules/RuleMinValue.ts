import IRule from "../interfaces/IRule";
import RuleBase from "../base/RuleBase";
import FieldModel from "../../base/FieldModel";
import RuleResponse from "../models/RuleResponse";

export default class RuleMinValue extends RuleBase implements IRule {
  private readonly minValue: number;

  constructor(minValue: number, customMessage?: string) {
    super(customMessage);
    this.minValue = minValue;
  }

  isValid(field: FieldModel): RuleResponse {
    if (this.isValueEmpty(field.value)) {
      return this.pass();
    }

    const number = Number(field.value);

    if (isNaN(number)) {
      return this.fail("must be a valid number");
    }

    if (number < this.minValue) {
      return this.fail(`must be equal or greater than ${this.minValue}`);
    }

    return this.pass();
  }
}
