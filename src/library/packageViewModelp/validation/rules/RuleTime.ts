import RuleDateTimeBase from '../base/RuleDateTimeBase';

export class RuleTime extends RuleDateTimeBase {
	constructor(customMessage?: string) {
		super(['HH:mm'], customMessage);
	}
}
