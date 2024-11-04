/// <reference types="jest" />

import FieldModel from "../../../../../viewModels/FieldModel";
import RuleInteger from "../RuleInteger";

describe("Integer", () => {
  test("text - fail", () => {
    // Arrange
    const rule = new RuleInteger();
    const testField = new FieldModel("text", "testField", "Test Field", "one two three");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be a whole number");
  });

  test("fraction", () => {
    // Arrange
    const rule = new RuleInteger();
    const testField = new FieldModel("text", "testField", "Test Field", "1.5");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
  });

  test("empty string - valid", () => {
    // Arrange
    const rule = new RuleInteger();
    const testField = new FieldModel("text", "testField", "Test Field", "");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
  });

  test("0 - valid", () => {
    // Arrange
    const rule = new RuleInteger();
    const testField = new FieldModel("text", "testField", "Test Field", "0");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
  });

  test("5 - valid", () => {
    // Arrange
    const rule = new RuleInteger();
    const testField = new FieldModel("text", "testField", "Test Field", "5");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
  });

  test("900 - valid", () => {
    // Arrange
    const rule = new RuleInteger();
    const testField = new FieldModel("text", "testField", "Test Field", "900");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
  });
});
