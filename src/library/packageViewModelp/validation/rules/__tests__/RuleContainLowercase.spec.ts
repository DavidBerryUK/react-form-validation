/// <reference types="jest" />

import FieldModel from "../../../../../viewModels/FieldModel";
import RuleContainLowerCase from "../RuleContainLowerCase";

describe("Rule Contain lowercase characters", () => {
  test("Pass - empty", () => {
    // Arrange

    const testField = new FieldModel("text", "testField", "Test Field", "");
    const rule = new RuleContainLowerCase(0, 100);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Fail - must contain 2-4 lowercase characters - actual 1", () => {
    // Arrange

    const testField = new FieldModel("text", "testField", "Test Field", "a");
    const rule = new RuleContainLowerCase(2, 4);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must contain at least 2 lowercase characters");
  });

  test("Pass - must contain 2-4 lowercase characters - actual 3", () => {
    // Arrange

    const testField = new FieldModel("text", "testField", "Test Field", "1234567890 abc 1234567890");
    const rule = new RuleContainLowerCase(2, 4);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Pass - must contain 2-4 lowercase characters - actual 4", () => {
    // Arrange

    const testField = new FieldModel("text", "testField", "Test Field", "12345  abcd 12345 ABCDEF");
    const rule = new RuleContainLowerCase(2, 4);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Fail - must contain 2-4 lowercase characters - actual 5", () => {
    // Arrange

    const testField = new FieldModel("text", "testField", "Test Field", "ab cd e ONE TWO THREE FOUR FIVE 123456");
    const rule = new RuleContainLowerCase(2, 4);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must contain no more than 4 lowercase characters");
  });

  test("Fail - must contain 1 lowercase characters - actual - none", () => {
    // Arrange

    const testField = new FieldModel("text", "testField", "Test Field", "ONE TWO THREE FOUR");
    const rule = new RuleContainLowerCase(1, 1);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must contain 1 lowercase character");
  });

  test("Fail - must contain 1-10 lowercase characters - actual - none", () => {
    // Arrange

    const testField = new FieldModel("text", "testField", "Test Field", "ABCDEFG");
    const rule = new RuleContainLowerCase(1, 10);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must contain at least 1 lowercase character");
  });

  test("Fail - must contain 0-1 lowercase characters - actual - 5", () => {
    // Arrange

    const testField = new FieldModel("text", "testField", "Test Field", "ab cd e");
    const rule = new RuleContainLowerCase(0, 1);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must contain a maximum 1 lowercase character");
  });
});
