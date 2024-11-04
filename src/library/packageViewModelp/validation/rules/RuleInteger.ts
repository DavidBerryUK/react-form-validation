import IRule from "../interfaces/IRule";
import RuleBase from "../base/RuleBase";
import FieldModel from "../../base/FieldModel";
import RuleResponse from "../models/RuleResponse";

export default class RuleInteger extends RuleBase implements IRule {
  isValid(field: FieldModel): RuleResponse {
    if (this.isValueEmpty(field.value)) {
      return this.pass();
    }

    const number = Number(field.value);
    if (!field.value || field.valueAsString.trim().length === 0 || isNaN(number) || !Number.isInteger(number)) {
      return this.fail("must be a whole number");
    }

    return this.pass();
  }
}
