import IRule from '../interfaces/IRule';
import RuleDateTimeBase from '../base/RuleDateTimeBase';

//
// Note, uses base class for IsValid()
//
export class RuleDateLocal extends RuleDateTimeBase implements IRule {
	constructor(customMessage?: string) {
		super(['dd/MM/yyyy', 'yyyy-MM-dd'], customMessage);
	}
}
