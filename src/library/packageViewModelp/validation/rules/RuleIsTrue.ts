import IRule from "../interfaces/IRule";
import RuleBase from "../base/RuleBase";
import FieldModel from "../../base/FieldModel";
import RuleResponse from "../models/RuleResponse";
import StringUtility from "../../../../utilities/StringUtility";

export default class RuleIsTrue extends RuleBase implements IRule {
  isValid(field: FieldModel): RuleResponse {
    if (this.isValueEmpty(field.value)) {
      return this.pass();
    }

    if (StringUtility.stringToIsTrue(field.valueAsString)) {
      return this.pass();
    }

    return this.fail(`must be true`);
  }
}
