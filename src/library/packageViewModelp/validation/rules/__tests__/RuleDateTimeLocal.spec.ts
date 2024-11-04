/// <reference types="jest" />

import FieldModel from "../../../../../viewModels/FieldModel";
import { RuleDateTimeLocal } from "../RuleDateTimeLocal";

describe("RuleDateTimeLocal", () => {
  test("valid date time dd/MM/yyyy HH:mm", () => {
    // Arrange
    const rule = new RuleDateTimeLocal();
    const testField = new FieldModel("text", "testField", "Test Field", "01/05/2010 15:30");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toBe("");
  });

  test("invalid date time dd/MM/yyyy HH:mm - date out of range", () => {
    // Arrange
    const rule = new RuleDateTimeLocal();
    const testField = new FieldModel("text", "testField", "Test Field", "34/05/2010 15:30");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe("must be a valid date time in the format dd/MM/yyyy HH:mm or yyyy-MM-dd HH:mm");
  });

  test("invalid date time dd/MM/yyyy HH:mm - Month out of range", () => {
    // Arrange
    const rule = new RuleDateTimeLocal();
    const testField = new FieldModel("text", "testField", "Test Field", "05/25/2010 15:30");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe("must be a valid date time in the format dd/MM/yyyy HH:mm or yyyy-MM-dd HH:mm");
  });

  test("invalid date time dd/MM/yyyy HH:mm - Year invalid", () => {
    // Arrange
    const rule = new RuleDateTimeLocal();
    const testField = new FieldModel("text", "testField", "Test Field", "05/11/201x 15:30");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe("must be a valid date time in the format dd/MM/yyyy HH:mm or yyyy-MM-dd HH:mm");
  });

  test("invalid date time dd/MM/yyyy HH:mm - Hour invalid", () => {
    // Arrange
    const rule = new RuleDateTimeLocal();

    const testField = new FieldModel("text", "testField", "Test Field", "05/11/2011 24:30");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe("must be a valid date time in the format dd/MM/yyyy HH:mm or yyyy-MM-dd HH:mm");
  });

  test("invalid date time dd/MM/yyyy HH:mm - Minute invalid", () => {
    // Arrange
    const rule = new RuleDateTimeLocal();

    const testField = new FieldModel("text", "testField", "Test Field", "05/11/2011 23:61");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toBe("must be a valid date time in the format dd/MM/yyyy HH:mm or yyyy-MM-dd HH:mm");
  });
});
