import FieldModel from "../../base/FieldModel";
import IRule from "../interfaces/IRule";
import RuleBase from "./RuleBase";
import RuleResponse from "../models/RuleResponse";

//
// this is tested extensively by the RuleContainsDigits.spec.ts test suite
//
export default class RuleContainBase extends RuleBase implements IRule {
  private readonly minCount: number;
  private readonly maxCount: number;
  private readonly validChars: string;
  private readonly plural: string;
  private readonly singular: string;

  constructor(minCount: number, maxCount: number, singular: string, plural: string, validChars: string, customMessage?: string) {
    super(customMessage);
    this.minCount = minCount;
    this.maxCount = maxCount;
    this.validChars = validChars;
    this.singular = singular;
    this.plural = plural;
  }

  isValid(field: FieldModel): RuleResponse {
    if (this.isValueEmpty(field.value)) {
      return this.pass();
    }

    const count = field.valueAsString.split("").filter((c) => this.validChars.indexOf(c) >= 0).length;

    if (count < this.minCount) {
      if (this.minCount === 1) {
        if (this.maxCount === 1) {
          return this.fail(`must contain 1 ${this.singular}`);
        }
        return this.fail(`must contain at least 1 ${this.singular}`);
      }
      return this.fail(`must contain at least ${this.minCount} ${this.plural}`);
    }
    if (count > this.maxCount) {
      if (this.maxCount === 0) {
        return this.fail(`must contain no ${this.plural}`);
      } else if (this.maxCount === 1) {
        if (this.minCount === 1) {
          return this.fail(`must contain 1 ${this.singular}`);
        } else {
          return this.fail(`must contain a maximum 1 ${this.singular}`);
        }
      }
      return this.fail(`must contain no more than ${this.maxCount} ${this.plural}`);
    }

    return this.pass();
  }
}
