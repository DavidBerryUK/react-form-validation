/// <reference types="jest" />

import FieldModel from "../../../../../viewModels/FieldModel";
import RuleEmpty from "../RuleEmpty";

describe("Empty", () => {
  test("pass - rule is empty", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "");
    const rule = new RuleEmpty();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toBe("");
  });

  test("fail - characters exist", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "xxx");
    const rule = new RuleEmpty();

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe("must be empty");
  });
});
