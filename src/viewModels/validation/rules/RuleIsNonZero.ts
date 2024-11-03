import IRule from "../interfaces/IRule";
import RuleBase from "../base/RuleBase";
import RuleResponse from "../models/RuleResponse";
import FieldModel from "../../base/FieldModel";

export default class RuleIsNonZero extends RuleBase implements IRule {
  isValid(field: FieldModel): RuleResponse {
    if (this.isValueEmpty(field.value)) {
      return this.pass();
    }

    const number = Number(field.valueAsString);

    if (isNaN(number)) {
      return this.pass();
    }
    if (number !== 0) {
      return this.pass();
    }

    return this.fail(`must be none zero`);
  }
}
