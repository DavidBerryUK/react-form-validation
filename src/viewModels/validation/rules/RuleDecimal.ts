import IRule from "../interfaces/IRule";
import RuleBase from "../base/RuleBase";
import FieldModel from "../../base/FieldModel";
import RuleResponse from "../models/RuleResponse";

export default class RuleDecimal extends RuleBase implements IRule {
  isValid(field: FieldModel): RuleResponse {
    if (this.isValueEmpty(field.value)) {
      return this.pass();
    }

    const number = Number(field.valueAsString);
    if (isNaN(number)) {
      return this.fail("must be a decimal");
    }

    return this.pass();
  }
}
