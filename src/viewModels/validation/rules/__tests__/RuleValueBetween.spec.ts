/// <reference types="jest" />

import FieldModel from "../../../../../viewModels/FieldModel";
import RuleValueBetween from "../RuleValueBetween";

describe("Rule Value Between", () => {
  test("Invalid Number", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "blap");
    const rule = new RuleValueBetween(10, 20);

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be a valid number");
  });

  test("Valid Integer Number in range", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "15");
    const rule = new RuleValueBetween(10, 20);

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Valid Decimal Number in range", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "15.5");
    const rule = new RuleValueBetween(10, 20);

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Valid Decimal Number below range", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "9.5");
    const rule = new RuleValueBetween(10, 20);

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be between 10 and 20");
  });

  test("Valid Decimal Number above range", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "20.1");
    const rule = new RuleValueBetween(10, 20);

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must be between 10 and 20");
  });
});
