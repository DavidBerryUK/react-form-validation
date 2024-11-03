export default class StringUtility {
  // Look for $ symbols and replace with -
  // Look for long acronyms and filter out the last letter
  // Look for lower-case letters followed by upper-case letters
  // Look for lower-case letters followed by numbers
  // Remove any white space left around the word
  static camelPad(str: string): string {
    return str
      .replace(/([$])/g, "-")
      .replace(/([A-Z]+)([A-Z][a-z])/g, " $1 $2")
      .replace(/([a-z\d])([A-Z])/g, "$1 $2")
      .replace(/([a-zA-Z])(\d)/g, "$1 $2")
      .replace(/^./, function (str) {
        return str.toUpperCase();
      })
      .trim();
  }

  static toBoolean(value: string): boolean {
    if (value === "true") {
      return true;
    }
    return false;
  }

  static toNumber(value: string | null | undefined): number | null {
    if (value === undefined || value === null) {
      return null;
    }
    if (value !== "") {
      const number = Number(value);
      if (isNaN(number)) {
        return null;
      }
      return number;
    }
    return null;
  }

  static stringToIsTrue(value: string): boolean {
    if (value === undefined || value === null) {
      return false;
    }

    switch (value.trim().toLocaleLowerCase()) {
      case "true":
      case "1":
      case "on":
      case "yes":
        return true;
    }
    return false;
  }

  static stringToIsFalse(value: string): boolean {
    if (value === undefined || value === null) {
      return false;
    }

    switch (value.trim().toLocaleLowerCase()) {
      case "false":
      case "0":
      case "off":
      case "no":
        return true;
    }
    return false;
  }
}
