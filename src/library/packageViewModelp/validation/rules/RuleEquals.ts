import FieldModel from "../../base/FieldModel";
import IRule from "../interfaces/IRule";
import RuleBase from "../base/RuleBase";
import RuleResponse from "../models/RuleResponse";

export default class RuleEquals extends RuleBase implements IRule {
  private readonly constant: string;
  private readonly caseInsensitive: boolean;

  constructor(constant: string, caseInsensitive: boolean, customMessage?: string) {
    super(customMessage);
    this.constant = constant;
    this.caseInsensitive = caseInsensitive;

    if (caseInsensitive) {
      this.constant = this.constant.toLocaleLowerCase();
    }
  }

  isValid(field: FieldModel): RuleResponse {
    if (this.isValueEmpty(field.value)) {
      return this.pass();
    }

    if (this.caseInsensitive === true) {
      if (field.valueAsString.toLocaleLowerCase() === this.constant) {
        return this.pass();
      }
    }

    if (this.caseInsensitive === false) {
      if (field.value === this.constant) {
        return this.pass();
      }
    }

    return this.fail(`must be equal to '${this.constant}'`);
  }
}
