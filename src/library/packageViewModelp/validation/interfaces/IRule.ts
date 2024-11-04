import FieldModel from "../../base/FieldModel";
import RuleResponse from "../models/RuleResponse";

// Define properties and methods for a validation rule.
// Any other values required to evaluate the rule must be passed as part of the constructor,
// This allows the rules to be defined in-line in the UI-Render template

export default interface IRule {
  // Method that runs the rule, where value is the text value being evaluated
  //
  //
  // form 	- instance of the form
  // field 	- field being validated from the form
  // value	- value from the field, trimmed
  isValid(field: FieldModel): RuleResponse;
}
