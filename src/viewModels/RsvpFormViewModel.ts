import EnumFieldDataType from "../library/packageViewModelp/enums/EnumFieldDataType";
import FieldModel from "../library/packageViewModelp/base/FieldModel";
import RuleInteger from "../library/packageViewModelp/validation/rules/RuleInteger";
import RuleMandatory from "../library/packageViewModelp/validation/rules/RuleMandatory";
import RuleMaxLength from "../library/packageViewModelp/validation/rules/RuleMaxLength";
import RuleMinLength from "../library/packageViewModelp/validation/rules/RuleMinLength";
import RuleValueBetween from "../library/packageViewModelp/validation/rules/RuleValueBetween";
import ViewModelBase from "../library/packageViewModelp/base/BaseViewModel";
import FieldSchema from "../library/packageViewModelp/base/FieldSchema";
import ViewModelSchema, { SchemaBase } from "../library/packageViewModelp/base/ViewModelSchema";
import { Map } from "immutable";

class RsvpViewModelSchema extends ViewModelSchema {
  fields: SchemaBase = {
    guestName: new FieldSchema("Guest Name", EnumFieldDataType.string, [new RuleMandatory(), new RuleMinLength(2), new RuleMaxLength(100)]),
    attending: new FieldSchema("Attending", EnumFieldDataType.boolean),
    numberOfGuests: new FieldSchema("Number Of Guests (1-4)", EnumFieldDataType.number, [new RuleMandatory(), new RuleInteger(), new RuleValueBetween(1, 4)]),
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
export class RsvpFormViewModel extends ViewModelBase {
  // the schema provides field meta data such as fieldname, ui-caption, data types

  static modelSchema = new RsvpViewModelSchema();

  /****************************************************/
  /* Initialize RsvpFormViewModel with Field Models */
  /****************************************************/

  /**
   * @param guestName - Initial value for the "guestName" field.
   * @param attending - Initial value for the "attending" field.
   * @param numberOfGuests - Initial value for the "numberOfGuests" field.
   * @returns {RsvpFormViewModel} A new instance of RsvpFormViewModel with initialized fields.
   */
  static createViewModel(guestName: string, attending: boolean, numberOfGuests: number): RsvpFormViewModel {
    const initialValues = { guestName, attending, numberOfGuests };

    let fields = Map<string, FieldModel>();

    // Define the type for keys of initialValues
    type InitialValueKeys = keyof typeof initialValues;

    // Get the keys of the RsvpFormViewModel's fields schema
    const rsvpFieldKeys = Object.keys(RsvpFormViewModel.modelSchema.fields) as Array<keyof typeof RsvpFormViewModel.modelSchema.fields>;

    rsvpFieldKeys.forEach((key) => {
      const fieldKey = key; // No need for type assertion, already a keyof

      const fieldSchema = RsvpFormViewModel.modelSchema.fields[fieldKey];

      // Ensure the key exists in initialValues
      if (key in initialValues) {
        const fieldValue = initialValues[key as InitialValueKeys]; // Now we can safely access it
        const field = FieldModel.fromSchema(fieldSchema, fieldValue);
        fields = fields.set(field.fieldName, field);
      }
    });

    return new RsvpFormViewModel(fields);
  }

  static CreateEmptyViewModel(): RsvpFormViewModel {
    return this.createViewModel("", false, 0);
  }

  /****************************************************/
  /* GETTERS FOR FIELD VALUES                         *
  /****************************************************/

  get guestName(): FieldModel {
    return this.fields.get(RsvpFormViewModel.modelSchema.fields.guestName.fieldName)!;
  }

  get attending(): FieldModel {
    return this.fields.get(RsvpFormViewModel.modelSchema.fields.attending.fieldName)!;
  }

  get numberOfGuests(): FieldModel {
    return this.fields.get(RsvpFormViewModel.modelSchema.fields.numberOfGuests.fieldName)!;
  }

  /****************************************************/
  /* Events                                           */
  /****************************************************/
  onFieldUpdated(oldField: FieldModel, newField: FieldModel): void {
    if (newField.fieldName === RsvpFormViewModel.modelSchema.fields.attending.fieldName) {
      console.log(`Attending Status has changed to [${newField.value?.toLocaleString()}]`);
    }
  }
}
