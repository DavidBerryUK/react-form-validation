import FieldModel from "../library/packageViewModelp/base/FieldModel";
import RuleMandatory from "../library/packageViewModelp/validation/rules/RuleMandatory";
import RuleMaxLength from "../library/packageViewModelp/validation/rules/RuleMaxLength";
import RuleMinLength from "../library/packageViewModelp/validation/rules/RuleMinLength";
import BaseViewModel from "../library/packageViewModelp/base/BaseViewModel";
import EnumFieldDataType from "../library/packageViewModelp/enums/EnumFieldDataType";
import ViewModelSchema, { SchemaBase } from "../library/packageViewModelp/base/ViewModelSchema";
import FieldSchema from "../library/packageViewModelp/base/FieldSchema";

class ContactViewModelSchema extends ViewModelSchema {
  fields: SchemaBase = {
    forename: new FieldSchema("Forename", EnumFieldDataType.string, [new RuleMandatory(), new RuleMinLength(2), new RuleMaxLength(100)]),
    surname: new FieldSchema("Surname", EnumFieldDataType.string, [new RuleMandatory(), new RuleMinLength(2), new RuleMaxLength(100)]),
    emailAddress: new FieldSchema("Email Address", EnumFieldDataType.string, [new RuleMandatory(), new RuleMinLength(2), new RuleMaxLength(250)]),
    message: new FieldSchema("Message", EnumFieldDataType.string, [new RuleMandatory(), new RuleMinLength(20), new RuleMaxLength(1000)]),
  };

  constructor() {
    super();
    this.populateFieldNames();
  }
}

/**
 * The Contact Form is imutable, meaning that it is read only and any
 * changes result in a new instance. With the help of immutable package
 * only the changes fields have a new instance, resulting in faster mutations
 * and reduction in memory changes
 */
export class ContactFormViewModel extends BaseViewModel<ContactFormViewModel> {
  // the schema provides field meta data such as fieldname, ui-caption, data types
  static modelSchema = new ContactViewModelSchema();

  /****************************************************/
  /* Initialize ContactFormViewModel with Field Models */
  /****************************************************/

  static CreateViewModel(forename: string, surname: string, emailAddress: string, message: string): ContactFormViewModel {
    // Define the type for initialValues based on the keys of the modelSchema fields
    const initialValues: {
      // this ensures that initial values are spelt correctly
      [K in keyof ContactViewModelSchema["fields"]]: ContactViewModelSchema["fields"][K];
    } = {
      forename,
      surname,
      emailAddress,
      message,
    } as any;
    return new ContactFormViewModel(this.createInitialFields(this.modelSchema, initialValues));
  }

  static CreateEmptyViewModel(): ContactFormViewModel {
    return this.CreateViewModel("", "", "", "");
  }

  /****************************************************/
  /* GETTERS FOR FIELD VALUES                         *
  /****************************************************/
  get forename(): FieldModel {
    return this.fields.get(ContactFormViewModel.modelSchema.fields.forename.fieldName)!;
  }

  get surname(): FieldModel {
    return this.fields.get(ContactFormViewModel.modelSchema.fields.surname.fieldName)!;
  }

  get emailAddress(): FieldModel {
    return this.fields.get(ContactFormViewModel.modelSchema.fields.emailAddress.fieldName)!;
  }

  get message(): FieldModel {
    return this.fields.get(ContactFormViewModel.modelSchema.fields.message.fieldName)!;
  }

  /****************************************************/
  /* Events                                           */
  /****************************************************/
  onFieldUpdated(model: ContactFormViewModel, oldField: FieldModel, newField: FieldModel): ContactFormViewModel {
    console.log(`Field ${newField.fieldName} updated from [${oldField.value}] to [${newField.validation}]`);
    return model;
  }
}
