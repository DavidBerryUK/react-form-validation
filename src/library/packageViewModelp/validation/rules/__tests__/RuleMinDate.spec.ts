/// <reference types="jest" />

import FieldModel from "../../../../../viewModels/FieldModel";
import RuleMinDate from "../RuleMinDate";

describe("Rule Min Date", () => {
  test("Invalid Constant", () => {
    // Arrange
    const rule = new RuleMinDate("orange apples and pears");
    const testField = new FieldModel("text", "testField", "Test Field", "01/05/1995");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("MinDate validation rule has invalid constant date of orange apples and pears");
  });

  test("Pass - Date dd/mm/yyyy - equal to constant", () => {
    // Arrange
    const rule = new RuleMinDate("01/05/2000");
    const testField = new FieldModel("text", "testField", "Test Field", "01/05/2000");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Pass - Date dd/mm/yyyy - greater than constant", () => {
    // Arrange
    const rule = new RuleMinDate("01/05/2000");
    const testField = new FieldModel("text", "testField", "Test Field", "02/05/2000");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Fail - Date dd/mm/yyyy - less than constant", () => {
    // Arrange
    const rule = new RuleMinDate("01/05/2000");
    const testField = new FieldModel("text", "testField", "Test Field", "25/04/2000");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must not be a date before 01/05/2000");
  });

  test("Pass - Date yyyy-MM-dd - equal to constant", () => {
    // Arrange
    const rule = new RuleMinDate("2000-05-01");
    const testField = new FieldModel("text", "testField", "Test Field", "2000-05-01");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Pass - Date yyyy-MM-dd - greater than constant", () => {
    // Arrange
    const rule = new RuleMinDate("2000-05-01");
    const testField = new FieldModel("text", "testField", "Test Field", "2000-05-02");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Fail - Date yyyy-MM-dd - less than constant", () => {
    // Arrange
    const rule = new RuleMinDate("2000-05-01");

    const testField = new FieldModel("text", "testField", "Test Field", "2000-04-25");

    // Act
    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must not be a date before 2000-05-01");
  });
});
