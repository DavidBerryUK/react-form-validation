import { format, isAfter } from "date-fns";
import IRule from "../interfaces/IRule";
import RuleDateTimeBase from "../base/RuleDateTimeBase";
import DateParseResponse from "../models/DateParseResponse";
import RuleResponse from "../models/RuleResponse";
import FieldModel from "../../base/FieldModel";

//
// works with date or date time, or times
//
export default class RuleMinDate extends RuleDateTimeBase implements IRule {
  private readonly minDate: DateParseResponse;
  private readonly constantMinDate: string;

  constructor(minDate: string, customMessage?: string) {
    super(["dd/MM/yyyy", "yyyy-MM-dd", "dd/MM/yyyy HH:mm", "yyyy-MM-dd HH:mm", "HH:mm"], customMessage);
    this.constantMinDate = minDate;
    this.minDate = this.parseMultipleFormats(minDate);
  }

  isValid(field: FieldModel): RuleResponse {
    if (this.isValueEmpty(field.value)) {
      return this.pass();
    }

    //
    // validate constant min date,
    //
    if (!this.minDate.success) {
      return this.fail(`MinDate validation rule has invalid constant date of ${this.constantMinDate}`);
    }

    //
    // parse and validate input date / time
    //
    const inputDate = this.parseMultipleFormats(field.valueAsString);
    if (!inputDate.success) {
      return this.fail(this.formatErrorMessage());
    }

    if (isAfter(this.minDate.result!, inputDate.result!)) {
      return this.fail(`must not be a date before ${format(this.minDate.result!, inputDate.matchingFormat!)}`);
    }

    return this.pass();
  }
}
