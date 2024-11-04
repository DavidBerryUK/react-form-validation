export default class DateParseResponse {
  input: string;
  result?: Date;
  success: boolean;
  matchingFormat?: string;

  constructor(input: string, success: boolean, output?: Date, matchingFormat?: string) {
    this.input = input;
    this.result = output;
    this.success = success;
    this.matchingFormat = matchingFormat;
  }
}
