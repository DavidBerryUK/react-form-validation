import IRule from '../interfaces/IRule';
import RuleContainBase from '../base/RuleContainBase';

export default class RuleContainDigits extends RuleContainBase implements IRule {
	static readonly validChars = '0123456789';
	static readonly plural = 'digits';
	static readonly singular = 'digit';

	constructor(minCount: number, maxCount: number, customMessage?: string) {
		super(minCount, maxCount, RuleContainDigits.singular, RuleContainDigits.plural, RuleContainDigits.validChars, customMessage);
	}
}
