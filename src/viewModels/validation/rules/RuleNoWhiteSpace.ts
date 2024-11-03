import IRule from "../interfaces/IRule";
import RuleBase from "../base/RuleBase";
import RuleResponse from "../models/RuleResponse";
import FieldModel from "../../base/FieldModel";

export default class RuleNoWhiteSpace extends RuleBase implements IRule {
  private message: string;

  constructor(customMessage?: string) {
    super(customMessage);

    this.message = this.customMessage ?? "cannot contain spaces";
  }

  isValid(field: FieldModel): RuleResponse {
    if (this.isValueEmpty(field.value)) {
      return this.fail(this.message);
    }

    const cleanedValue = field.valueAsString.replace(/\s+/g, "");

    if (cleanedValue !== field.valueAsString) {
      return this.fail(this.message);
    }

    return this.pass();
  }
}
