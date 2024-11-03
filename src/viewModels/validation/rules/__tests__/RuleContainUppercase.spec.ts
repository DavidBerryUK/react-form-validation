/// <reference types="jest" />

import FieldModel from "../../../../../viewModels/FieldModel";
import RuleContainUpperCase from "../RuleContainSymbols";

describe("Rule Contain uppercase characters", () => {
  test("Pass - empty", () => {
    // Arrange

    const testField = new FieldModel("text", "testField", "Test Field", "");
    const rule = new RuleContainUpperCase(0, 100);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Fail - must contain 2-4 uppercase characters - actual 1", () => {
    // Arrange

    const testField = new FieldModel("text", "testField", "Test Field", "aAaaaa2222");
    const rule = new RuleContainUpperCase(2, 4);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must contain at least 2 uppercase characters");
  });

  test("Pass - must contain 2-4 uppercase characters - actual 2", () => {
    // Arrange

    const testField = new FieldModel("text", "testField", "Test Field", "this must two Capital Letters");
    const rule = new RuleContainUpperCase(2, 4);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Pass - must contain 2-4 uppercase characters - actual 3", () => {
    // Arrange

    const testField = new FieldModel("text", "testField", "Test Field", "123ABC12922929one two three four");
    const rule = new RuleContainUpperCase(2, 4);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Pass - must contain 2-4 uppercase characters - actual 4", () => {
    // Arrange

    const testField = new FieldModel("text", "testField", "Test Field", "1234ABCDababab29292");
    const rule = new RuleContainUpperCase(2, 4);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeTruthy();
    expect(result.message).toEqual("");
  });

  test("Fail - must contain 2-4 uppercase characters - actual 5", () => {
    // Arrange

    const testField = new FieldModel("text", "testField", "Test Field", "One Two Three Four Five");
    const rule = new RuleContainUpperCase(2, 4);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must contain no more than 4 uppercase characters");
  });

  test("Fail - must contain 1 uppercase characters - actual - none", () => {
    // Arrange

    const testField = new FieldModel("text", "testField", "Test Field", "abc");
    const rule = new RuleContainUpperCase(1, 1);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must contain 1 uppercase character");
  });

  test("Fail - must contain 1-10 uppercase characters - actual - none", () => {
    // Arrange

    const testField = new FieldModel("text", "testField", "Test Field", "abc");
    const rule = new RuleContainUpperCase(1, 10);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must contain at least 1 uppercase character");
  });

  test("Fail - must contain 0-1 uppercase characters - actual - 5", () => {
    // Arrange

    const testField = new FieldModel("text", "testField", "Test Field", "abc12345bdbd One Two Three Four Five");
    const rule = new RuleContainUpperCase(0, 1);
    // Act

    const result = rule.isValid(testField);

    // Assert
    expect(result.pass).toBeFalsy();
    expect(result.message).toEqual("must contain a maximum 1 uppercase character");
  });
});
