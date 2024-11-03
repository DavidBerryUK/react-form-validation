/// <reference types="jest" />

import FieldModel from "../../../../../viewModels/FieldModel";
import RuleIsNonZero from "../RuleIsNonZero";

describe("Rule Is None Zero", () => {
  test("Expect Pass - empty string", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "");
    const rule = new RuleIsNonZero();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Expect False - 0", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "0");
    const rule = new RuleIsNonZero();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be none zero");
  });

  test("Expect Pass - 1", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "1");
    const rule = new RuleIsNonZero();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Expect Pass - -1", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "-1");
    const rule = new RuleIsNonZero();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Expect Pass - invalid number", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "0.0.1");
    const rule = new RuleIsNonZero();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Expect Pass - Random Word", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "Purple");
    const rule = new RuleIsNonZero();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });
});
