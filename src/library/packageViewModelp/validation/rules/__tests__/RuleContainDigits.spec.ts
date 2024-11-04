/// <reference types="jest" />

import FieldModel from "../../../../../viewModels/FieldModel";
import RuleContainDigits from "../RuleContainDigits";

describe("Rule Contain Digits", () => {
  test("Pass - empty", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "");
    const rule = new RuleContainDigits(0, 100);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Fail - must contain 2-4 digits - actual 1", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "1");
    const rule = new RuleContainDigits(2, 4);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must contain at least 2 digits");
  });

  test("Pass - must contain 2-4 digits - actual 2", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "12");
    const rule = new RuleContainDigits(2, 4);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Pass - must contain 2-4 digits - actual 3", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "123");
    const rule = new RuleContainDigits(2, 4);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Pass - must contain 2-4 digits - actual 4", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "1234");
    const rule = new RuleContainDigits(2, 4);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Fail - must contain 2-4 digits - actual 5", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "12345");
    const rule = new RuleContainDigits(2, 4);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must contain no more than 4 digits");
  });

  test("Fail - must contain 1 digits - actual - none", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "abc");
    const rule = new RuleContainDigits(1, 1);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must contain 1 digit");
  });

  test("Fail - must contain 1-10 digits - actual - none", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "abc");
    const rule = new RuleContainDigits(1, 10);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must contain at least 1 digit");
  });

  test("Fail - must contain 0-1 digits - actual - 5", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "abc12345bdbd");
    const rule = new RuleContainDigits(0, 1);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must contain a maximum 1 digit");
  });
});
