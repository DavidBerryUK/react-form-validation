import IRule from "../interfaces/IRule";
import RuleBase from "../base/RuleBase";
import RuleResponse from "../models/RuleResponse";
import FieldModel from "../../base/FieldModel";

// https://stackoverflow.com/questions/164979/regex-for-matching-uk-postcodes
// Can accept the following formats:
// “GIR 0AA”
// A9 9ZZ
// A99 9ZZ
// AB9 9ZZ
// AB99 9ZZ
// A9C 9ZZ
// AD9E 9ZZ
// Where:

// 9 can be any single digit number.
// A can be any letter except for Q, V or X.
// B can be any letter except for I, J or Z.
// C can be any letter except for I, L, M, N, O, P, Q, R, V, X, Y or Z.
// D can be any letter except for I, J or Z.
// E can be any of A, B, E, H, M, N, P, R, V, W, X or Y.
// Z can be any letter except for C, I, K, M, O or V.
export default class RuleUkPostCode extends RuleBase implements IRule {
  private readonly regex =
    /^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/;

  ///
  isValid(field: FieldModel): RuleResponse {
    if (this.isValueEmpty(field.value)) {
      return this.pass();
    }

    if (!this.regex.test(field.valueAsString)) {
      return this.fail(`must be a valid UK Post Code`);
    }

    return this.pass();
  }
}
