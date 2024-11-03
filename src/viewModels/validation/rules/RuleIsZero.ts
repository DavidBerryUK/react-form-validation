import FieldModel from "../../base/FieldModel";
import IRule from "../interfaces/IRule";
import RuleBase from "../base/RuleBase";
import RuleResponse from "../models/RuleResponse";

export default class RuleIsZero extends RuleBase implements IRule {
  isValid(field: FieldModel): RuleResponse {
    if (this.isValueEmpty(field.value)) {
      return this.pass();
    }

    const number = Number(field.value);

    if (!isNaN(number)) {
      if (number === 0) {
        return this.pass();
      }
    }

    return this.fail(`must be zero`);
  }
}
