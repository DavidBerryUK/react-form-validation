/// <reference types="jest" />

import FieldModel from "../../../../../viewModels/FieldModel";
import RuleMinValue from "../RuleMinValue";

describe("Rule Min Value", () => {
  test("Invalid Number", () => {
    // Arrange
    const rule = new RuleMinValue(10);
    const testField = new FieldModel("text", "testField", "Test Field", "ancd");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be a valid number");
  });

  test("Valid Integer Number above range", () => {
    // Arrange
    const rule = new RuleMinValue(10);
    const testField = new FieldModel("text", "testField", "Test Field", "15");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Invalid Number below range", () => {
    // Arrange
    const rule = new RuleMinValue(10);
    const testField = new FieldModel("text", "testField", "Test Field", "9.5");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be equal or greater than 10");
  });
});
