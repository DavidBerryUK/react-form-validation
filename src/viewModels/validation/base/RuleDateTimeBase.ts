import { enGB } from "date-fns/locale";
import { isValid, parse } from "date-fns";
import DateParseResponse from "../models/DateParseResponse";
import FieldModel from "../../base/FieldModel";
import IRule from "../interfaces/IRule";
import RuleBase from "./RuleBase";
import RuleResponse from "../models/RuleResponse";

export default class RuleDateTimeBase extends RuleBase implements IRule {
  formats: string[];

  constructor(formats: string[], customMessage?: string) {
    super(customMessage);
    this.formats = formats;
  }

  isValid(field: FieldModel): RuleResponse {
    if (this.isValueEmpty(field.value)) {
      return this.pass();
    }

    const result = this.parseMultipleFormats(field.valueAsString);

    if (!result.success) {
      return this.fail(this.formatErrorMessage());
    }
    return this.pass();
  }

  parseMultipleFormats(value: string): DateParseResponse {
    for (let f = 0, fl = this.formats.length; f < fl; f++) {
      const parsedDated = parse(value, this.formats[f], new Date(), { locale: enGB });
      if (isValid(parsedDated)) {
        return new DateParseResponse(value, true, parsedDated, this.formats[f]);
      }
    }
    return new DateParseResponse(value, false);
  }

  formatErrorMessage(): string {
    if (this.customMessage !== undefined && this.customMessage !== null && this.customMessage !== "") {
      return this.customMessage;
    }
    const isDate = this.formats.filter((item) => item.toLocaleLowerCase().includes("dd")).length > 0;
    const isTime = this.formats.filter((item) => item.toLocaleLowerCase().includes("hh")).length > 0;
    let formatType = "value";
    if (isDate && isTime) {
      formatType = "date time";
    } else {
      if (isDate === true) {
        formatType = "date";
      } else if (isTime === true) {
        formatType = "time";
      }
    }

    if (this.formats.length === 0) {
      return "No valid formatters specified on the rule";
    }

    if (this.formats.length === 1) {
      return `must be a valid ${formatType} in the format ${this.formats[0]}`;
    }

    if (this.formats.length === 2) {
      return `must be a valid ${formatType} in the format ${this.formats[0]} or ${this.formats[1]}`;
    }

    if (this.formats.length === 3) {
      return `must be a valid ${formatType} in the format ${this.formats[0]}, ${this.formats[1]} or ${this.formats[2]}`;
    }

    return `must be a valid ${formatType} in the format ${this.formats.join(",")}`;
  }
}
