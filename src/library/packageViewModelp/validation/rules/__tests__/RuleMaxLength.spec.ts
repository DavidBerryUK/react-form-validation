/// <reference types="jest" />

import FieldModel from "../../../../../viewModels/FieldModel";
import RuleMaxLength from "../RuleMaxLength";

describe("MaxLength", () => {
  test("over max length - fail", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "123456");
    const rule = new RuleMaxLength(5);

    // Act
    const result = rule.isValid(testField);
    expect(result.message).toBe("must be less or equal to 5 characters");

    // Assert
    expect(result.pass).toBeFalsy();
  });

  test("over max length by a lot- fail", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "123456789012345");
    const rule = new RuleMaxLength(10);

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
  });

  test("empty string - pass", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "");
    const rule = new RuleMaxLength(5);

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
  });

  test("less than max - pass", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "123");
    const rule = new RuleMaxLength(5);

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
  });

  test("equal to max - pass", () => {
    // Arrange
    const testField = new FieldModel("text", "testField", "Test Field", "12345");
    const rule = new RuleMaxLength(5);

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
  });
});
