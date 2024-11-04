/// <reference types="jest" />
import FieldModel from "../../../../../viewModels/FieldModel";
import RuleMaxValue from "../RuleMaxValue";

describe("Rule Max Value", () => {
  test("Invalid Number", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "ancd");
    const rule = new RuleMaxValue(10);

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be a valid number");
  });

  test("Valid Integer Number below range", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "8");
    const rule = new RuleMaxValue(10);

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Invalid Number above range", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "100");
    const rule = new RuleMaxValue(10);

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be equal or less than 10");
  });
});
