/// <reference types="jest" />

import FieldModel from "../../../../../viewModels/FieldModel";
import { RuleDateLocal } from "../RuleDateLocal";

describe("RuleDateLocal", () => {
  test("valid date dd/mm/yyyy", () => {
    // Arrange
    const rule = new RuleDateLocal();
    const testField = new FieldModel("text", "testField", "Test Field", "01/05/2010");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toBe("");
  });

  test("invalid date dd/mm/yyyy - date out of range", () => {
    // Arrange
    const rule = new RuleDateLocal();
    const testField = new FieldModel("text", "testField", "Test Field", "34/05/2010");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe("must be a valid date in the format dd/MM/yyyy or yyyy-MM-dd");
  });

  test("invalid date dd/mm/yyyy - month out of range", () => {
    // Arrange
    const rule = new RuleDateLocal();
    const testField = new FieldModel("text", "testField", "Test Field", "4/15/2010");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe("must be a valid date in the format dd/MM/yyyy or yyyy-MM-dd");
  });

  test("invalid date dd/mm/yyyy - year has characters", () => {
    // Arrange
    const rule = new RuleDateLocal();
    const testField = new FieldModel("text", "testField", "Test Field", "4/05/xxxx");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe("must be a valid date in the format dd/MM/yyyy or yyyy-MM-dd");
  });

  test("valid date yyyy-MM-dd", () => {
    // Arrange
    const rule = new RuleDateLocal();
    const testField = new FieldModel("text", "testField", "Test Field", "2010-05-01");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toBe("");
  });

  test("invalid date yyyy-MM-dd - date out of range", () => {
    // Arrange
    const rule = new RuleDateLocal();
    const testField = new FieldModel("text", "testField", "Test Field", "2010-05-91");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe("must be a valid date in the format dd/MM/yyyy or yyyy-MM-dd");
  });

  test("invalid date yyyy-MM-dd - month out of range", () => {
    // Arrange
    const rule = new RuleDateLocal();
    const testField = new FieldModel("text", "testField", "Test Field", "2010-15-01");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe("must be a valid date in the format dd/MM/yyyy or yyyy-MM-dd");
  });

  test("invalid date yyyy-MM-dd - year has characters", () => {
    // Arrange
    const rule = new RuleDateLocal();
    const testField = new FieldModel("text", "testField", "Test Field", "20xx-05-01");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe("must be a valid date in the format dd/MM/yyyy or yyyy-MM-dd");
  });
});
