export default class RuleResponse {
  readonly pass: boolean;
  readonly message: string;

  constructor(pass: boolean, message?: string) {
    this.pass = pass;
    this.message = message || "";
  }

  static pass(): RuleResponse {
    return new RuleResponse(true);
  }

  static fail(message: string) {
    return new RuleResponse(false, message);
  }
}
