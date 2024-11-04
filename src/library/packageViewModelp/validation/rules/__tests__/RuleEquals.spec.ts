/// <reference types="jest" />

import FieldModel from "../../../../../viewModels/FieldModel";
import RuleEquals from "../RuleEquals";

describe("Rule Equals", () => {
  test("Pass - Case Sensitive", () => {
    // Arrange

    const testField = new FieldModel("text", "testField", "Test Field", "Orange");
    const rule = new RuleEquals("Orange", false);

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Fail - Case Sensitive", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "orange");
    const rule = new RuleEquals("Orange", false);

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be equal to 'Orange'");
  });

  test("Pass - Case Insensitive - same case", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "Orange");
    const rule = new RuleEquals("Orange", true);

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Pass - Case Insensitive - diff case", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "orange");
    const rule = new RuleEquals("Orange", true);

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });
});
