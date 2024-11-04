/// <reference types="jest" />

import FieldModel from "../../../../../viewModels/FieldModel";
import RuleUkPostCode from "../RuleUkPostCode";

describe("UK PostCode", () => {
  test("pass - empty", () => {
    // Arrange
    const rule = new RuleUkPostCode();
    const testField = new FieldModel("text", "testField", "Test Field", "");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toBe("");
  });

  test("pass - BBC - W1A 1AA", () => {
    // Arrange
    const rule = new RuleUkPostCode();
    const testField = new FieldModel("text", "testField", "Test Field", "W1A 1AA");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toBe("");
  });

  test("fail - random", () => {
    // Arrange
    const rule = new RuleUkPostCode();
    const testField = new FieldModel("text", "testField", "Test Field", "W1X4A 1A3A");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe("must be a valid UK Post Code");
  });
});
