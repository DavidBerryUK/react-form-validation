/// <reference types="jest" />

import FieldModel from "../../../../../viewModels/FieldModel";
import RulePositive from "../RulePositive";

describe("Rule Positive", () => {
  test("Fail - Invalid Number", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "ancd");
    const rule = new RulePositive(false);

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be positive");
  });

  test("Pass - (allow zero = false ) positive number : 10", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "10");
    const rule = new RulePositive(false);

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Pass - (allow zero = true ) positive number : 10", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "10");
    const rule = new RulePositive(true);

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Fail - (allow zero = false ) positive number : -20", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "-20");
    const rule = new RulePositive(false);

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be positive");
  });

  test("Fail - (allow zero = true ) positive number : -20", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "-20");
    const rule = new RulePositive(true);

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be positive or zero");
  });

  test("Fail - (allow zero = false ) positive number : 0", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "0");
    const rule = new RulePositive(false);

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be positive");
  });

  test("Pass - (allow zero = true ) positive number : 0", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "0");
    const rule = new RulePositive(true);

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });
});
