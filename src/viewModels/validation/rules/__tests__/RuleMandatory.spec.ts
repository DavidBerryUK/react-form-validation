/// <reference types="jest" />

import FieldModel from "../../../../../viewModels/FieldModel";
import RuleMandatory from "../RuleMandatory";

describe("Mandatory", () => {
  test("empty string", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "");
    const rule = new RuleMandatory();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("is mandatory");
  });

  test("single character", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "a");
    const rule = new RuleMandatory();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
  });

  test("full string", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "one two three");
    const rule = new RuleMandatory();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
  });
});
