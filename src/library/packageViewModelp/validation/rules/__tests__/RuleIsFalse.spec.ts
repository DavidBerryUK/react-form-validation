/// <reference types="jest" />

import FieldModel from "../../../../../viewModels/FieldModel";
import RuleIsFalse from "../RuleIsFalse";

describe("Rule IsFalse", () => {
  test("Expect Pass: value = Empty", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "");
    const rule = new RuleIsFalse();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Expect Pass: value = true", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "true");
    const rule = new RuleIsFalse();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be false");
  });

  test("Expect Pass: value = TRUE", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "TRUE");
    const rule = new RuleIsFalse();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be false");
  });

  test("Expect Pass: value = 1", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "1");
    const rule = new RuleIsFalse();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be false");
  });

  test("Expect Pass: value = yes", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "yes");
    const rule = new RuleIsFalse();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be false");
  });

  test("Expect Pass: value = YES", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "YES");
    const rule = new RuleIsFalse();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be false");
  });

  test("Expect Fail: value = false", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "false");
    const rule = new RuleIsFalse();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Expect Fail: value = FALSE", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "FALSE");
    const rule = new RuleIsFalse();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Expect Fail: value = Random Words", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "Orange");
    const rule = new RuleIsFalse();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be false");
  });
});
