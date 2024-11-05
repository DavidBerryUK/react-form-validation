import EnumFieldDataType from "../enums/EnumFieldDataType";
import IRule from "../validation/interfaces/IRule";

export default class FieldSchema {
  /**
   * This is auto populated by SchemaProcessor
   */
  public fieldName: string = "";

  /**
   * The caption to display in the UI
   */
  public caption: string = "";

  /**
   * Type of the field, e.g. string, number, boolean or data
   */
  public dataType: EnumFieldDataType;

  /**
   * Validation rules
   */
  public rules: Array<IRule>;

  constructor(caption: string, dataType: EnumFieldDataType, rules?: Array<IRule>) {
    this.caption = caption;
    this.dataType = dataType;
    this.rules = rules ?? new Array<IRule>();
  }
}
