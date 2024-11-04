import IRule from '../interfaces/IRule';
import RuleContainBase from '../base/RuleContainBase';

export default class RuleContainLowerCase extends RuleContainBase implements IRule {
	static readonly validChars = 'abcdefghijklmnopqrstuvwxyx';
	static readonly plural = 'lowercase characters';
	static readonly singular = 'lowercase character';

	constructor(minCount: number, maxCount: number, customMessage?: string) {
		super(minCount, maxCount, RuleContainLowerCase.singular, RuleContainLowerCase.plural, RuleContainLowerCase.validChars, customMessage);
	}
}
