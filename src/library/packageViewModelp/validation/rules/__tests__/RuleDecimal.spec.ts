/// <reference types="jest" />

import FieldModel from "../../../../../viewModels/FieldModel";
import RuleDecimal from "../RuleDecimal";

describe("Decimal", () => {
  test("text - fail", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "one two three");
    const rule = new RuleDecimal();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be a decimal");
  });

  test("fraction", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "1.5");
    const rule = new RuleDecimal();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
  });

  test("empty string - valid", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "");
    const rule = new RuleDecimal();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
  });

  test("0 - valid", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "0");
    const rule = new RuleDecimal();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
  });

  test("5 - valid", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "5");
    const rule = new RuleDecimal();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
  });

  test("900 - valid", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "900");
    const rule = new RuleDecimal();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
  });
});
