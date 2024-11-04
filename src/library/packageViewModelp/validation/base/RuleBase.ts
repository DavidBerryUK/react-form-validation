import RuleResponse from "../models/RuleResponse";

export default class RuleBase {
  readonly customMessage?: string;

  constructor(customMessage?: string) {
    this.customMessage = customMessage;
  }

  isValueEmpty(value: string | number | Date | undefined | null): boolean {
    if (value === undefined || value === null) {
      return true;
    }
    if (typeof value === "string" && value.trim().length === 0) {
      return true;
    }
    return false;
  }

  fail(message: string): RuleResponse {
    return RuleResponse.fail(this.customMessage || message);
  }

  pass(): RuleResponse {
    return RuleResponse.pass();
  }
}
