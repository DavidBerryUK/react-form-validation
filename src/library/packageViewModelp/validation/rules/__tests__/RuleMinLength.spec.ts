/// <reference types="jest" />

import FieldModel from "../../../../../viewModels/FieldModel";
import RuleMinLength from "../RuleMinLength";

describe("MinLength", () => {
  test("under min length - fail", () => {
    // Arrange
    const rule = new RuleMinLength(5);
    const testField = new FieldModel("text", "testField", "Test Field", "123");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe("must be greater or equal to 5 characters");
  });

  test("empty string - pass as rule is not mandatory", () => {
    // Arrange
    const rule = new RuleMinLength(5);
    const testField = new FieldModel("text", "testField", "Test Field", "");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
  });

  test("over min - pass", () => {
    // Arrange
    const rule = new RuleMinLength(5);
    const testField = new FieldModel("text", "testField", "Test Field", "1234567890");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
  });

  test("equal to max - pass", () => {
    // Arrange
    const rule = new RuleMinLength(5);
    const testField = new FieldModel("text", "testField", "Test Field", "12345");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
  });
});
