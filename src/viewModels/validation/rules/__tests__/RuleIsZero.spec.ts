/// <reference types="jest" />

import FieldModel from "../../../../../viewModels/FieldModel";
import RuleIsZero from "../RuleIsZero";

describe("Rule Is Zero", () => {
  test("Expect Pass - empty string", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "");
    const rule = new RuleIsZero();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Expect Pass - 0", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "0");
    const rule = new RuleIsZero();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Expect Fail - 1", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "1");
    const rule = new RuleIsZero();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be zero");
  });

  test("Expect Fail - -1", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "-1");
    const rule = new RuleIsZero();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be zero");
  });

  test("Expect Fail - invalid number", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "0.0.1");
    const rule = new RuleIsZero();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be zero");
  });

  test("Expect Fail - Random Word", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "Purple");
    const rule = new RuleIsZero();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be zero");
  });
});
