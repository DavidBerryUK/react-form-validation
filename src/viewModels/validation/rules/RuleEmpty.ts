import IRule from "../interfaces/IRule";
import RuleBase from "../base/RuleBase";
import FieldModel from "../../base/FieldModel";
import RuleResponse from "../models/RuleResponse";

export default class RuleEmpty extends RuleBase implements IRule {
  isValid(field: FieldModel): RuleResponse {
    if (this.isValueEmpty(field.value)) {
      return this.pass();
    }

    return this.fail(`must be empty`);
  }
}
