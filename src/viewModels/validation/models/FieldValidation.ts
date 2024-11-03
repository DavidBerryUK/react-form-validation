import FieldModel from "../../base/FieldModel";
import IFieldValidation from "../interfaces/IFieldValidation";
import IRule from "../interfaces/IRule";

/**
 * performs validation for a UIField
 */
export default class FieldValidation implements IFieldValidation {
  private rules: Array<IRule>;
  private messages: Array<string>;
  private fieldCaption: string = "";

  constructor(rules: Array<IRule>) {
    this.rules = rules;
    this.messages = new Array<string>();
  }

  get countAll(): number {
    return this.messages.length;
  }

  private get messagesAsSummary(): string {
    if (this.messages.length === 0) {
      return "";
    }
    let count = 0;
    let msg = "";
    this.messages.forEach((message) => {
      if (count > 0) {
        msg = `${msg} and `;
      }
      count++;
      msg = `${msg}${message}`;
    });
    return msg;
  }

  get validationMessage(): string {
    if (this.countAll === 0) {
      return "";
    }

    return `${this.fieldCaption} ${this.messagesAsSummary}`;
  }

  validate(field: FieldModel) {
    console.log(`--------------validating------------- with value ${field.value}`);
    var isValid = true;
    this.messages = new Array<string>();
    this.fieldCaption = field.caption;

    this.rules.forEach((rule) => {
      var response = rule.isValid(field);

      if (!response.pass) {
        isValid = false;
        this.messages.push(response.message);
      }
    });

    return isValid;
  }
}
