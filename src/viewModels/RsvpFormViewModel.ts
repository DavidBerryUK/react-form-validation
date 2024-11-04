import { Map } from "immutable";
import FieldModel, { FieldSchema, FieldTypeString } from "../library/packageViewModelp/base/FieldModel";
import RuleMandatory from "../library/packageViewModelp/validation/rules/RuleMandatory";
import RuleMaxLength from "../library/packageViewModelp/validation/rules/RuleMaxLength";
import RuleMinLength from "../library/packageViewModelp/validation/rules/RuleMinLength";
import ViewModelBase, { FormSchemaInitialise } from "../library/packageViewModelp/base/BaseViewModel";
import RuleValueBetween from "../library/packageViewModelp/validation/rules/RuleValueBetween";
import EnumFieldDataType from "../library/packageViewModelp/enums/EnumFieldDataType";
import RuleInteger from "../library/packageViewModelp/validation/rules/RuleInteger";

type RsvpSchema = {
  guestName: FieldSchema;
  attending: FieldSchema;
  numberOfGuests: FieldSchema;
};

const schemaConfig: FormSchemaInitialise = {
  guestName: { caption: "Guest Name", dataType: EnumFieldDataType.string, rules: [new RuleMandatory(), new RuleMinLength(2), new RuleMaxLength(100)] },
  attending: { caption: "Attending?", dataType: EnumFieldDataType.boolean, rules: [] },
  numberOfGuests: {
    caption: "Number Of Guests (1-4)",
    dataType: EnumFieldDataType.number,
    rules: [new RuleMandatory(), new RuleInteger(), new RuleValueBetween(1, 4)],
  },
};

/**
 * The Contact Form is imutable, meaning that it is read only and any
 * changes result in a new instance. With the help of immutable package
 * only the changes fields have a new instance, resulting in faster mutations
 * and reduction in memory changes
 */
export class RsvpFormViewModel extends ViewModelBase {
  // the schema provides field meta data such as fieldname, ui-caption, data types
  private static readonly schema: RsvpSchema = this.createSchemaFromConfig<RsvpSchema>(schemaConfig);

  /****************************************************/
  /* Initialize RsvpFormViewModel with Field Models */
  /****************************************************/

  /**
   * @param guestName - Initial value for the "guestName" field.
   * @param attending - Initial value for the "attending" field.
   * @param numberOfGuests - Initial value for the "numberOfGuests" field.
   * @returns {RsvpFormViewModel} A new instance of RsvpFormViewModel with initialized fields.
   */
  static CreateViewModel(guestName: FieldTypeString, attending: FieldTypeString, numberOfGuests: FieldTypeString): RsvpFormViewModel {
    const initialValues = { guestName, attending, numberOfGuests };

    // Map field names to FieldModel instances based on the schema and initial values
    const fields = Map<string, FieldModel>(
      Object.keys(RsvpFormViewModel.schema).map((key) => {
        const fieldSchema = RsvpFormViewModel.schema[key as keyof RsvpSchema];
        const fieldValue = initialValues[key as keyof RsvpSchema];
        return [fieldSchema.fieldName, FieldModel.fromSchema(fieldSchema, fieldValue)];
      }),
    );
    return new RsvpFormViewModel(fields);
  }

  static CreateEmptyViewModel(): RsvpFormViewModel {
    return this.CreateViewModel("", "", "");
  }

  /****************************************************/
  /* GETTERS FOR FIELD VALUES                         *
  /****************************************************/

  get guestName(): FieldModel {
    return this.fields.get(RsvpFormViewModel.schema.guestName.fieldName)!;
  }

  get attending(): FieldModel {
    return this.fields.get(RsvpFormViewModel.schema.attending.fieldName)!;
  }

  get numberOfGuests(): FieldModel {
    return this.fields.get(RsvpFormViewModel.schema.numberOfGuests.fieldName)!;
  }

  /****************************************************/
  /* Modify Field Values                              */
  /****************************************************/
  cloneWithField(field: FieldModel): RsvpFormViewModel {
    return new RsvpFormViewModel(this.fields.set(field.fieldName, field));
  }

  /****************************************************/
  /* Clone Object                                     */
  /****************************************************/
  clone(): RsvpFormViewModel {
    return new RsvpFormViewModel(this.fields);
  }
}
