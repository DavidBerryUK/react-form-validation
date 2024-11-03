/// <reference types="jest" />

import FieldModel from "../../../../../viewModels/FieldModel";
import RuleIsTrue from "../RuleIsTrue";

describe("Rule IsTrue", () => {
  test("Expect Pass: value = Empty", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "");
    const rule = new RuleIsTrue();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Expect Pass: value = true", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "true");
    const rule = new RuleIsTrue();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Expect Pass: value = TRUE", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "TRUE");
    const rule = new RuleIsTrue();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Expect Pass: value = 1", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "1");
    const rule = new RuleIsTrue();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Expect Pass: value = yes", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "yes");
    const rule = new RuleIsTrue();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Expect Pass: value = YES", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "YES");
    const rule = new RuleIsTrue();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Expect Fail: value = false", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "false");
    const rule = new RuleIsTrue();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be true");
  });

  test("Expect Fail: value = FALSE", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "FALSE");
    const rule = new RuleIsTrue();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be true");
  });

  test("Expect Fail: value = Random Words", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "Orange");
    const rule = new RuleIsTrue();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be true");
  });
});
