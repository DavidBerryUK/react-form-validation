import IRule from '../interfaces/IRule';
import RuleDateTimeBase from '../base/RuleDateTimeBase';

export class RuleDateTimeLocal extends RuleDateTimeBase implements IRule {
	constructor(customMessage?: string) {
		super(['dd/MM/yyyy HH:mm', 'yyyy-MM-dd HH:mm'], customMessage);
	}
}
