import IRule from "../interfaces/IRule";
import RuleBase from "../base/RuleBase";
import FieldModel from "../../base/FieldModel";
import RuleResponse from "../models/RuleResponse";

//
// will validate either integers or decimal, if you require
// further checks on types, then include RuleDecimal or RuleInteger
// in the rules collection
//
export default class RuleValueBetween extends RuleBase implements IRule {
  private readonly minValue: number;
  private readonly maxValue: number;

  constructor(minValue: number, maxValue: number, customMessage?: string) {
    super(customMessage);
    this.minValue = minValue;
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

    if (number < this.minValue || number > this.maxValue) {
      return this.fail(`must be between ${this.minValue} and ${this.maxValue}`);
    }

    return this.pass();
  }
}
