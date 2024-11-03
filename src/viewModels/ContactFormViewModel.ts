import ViewModelBase, { FormSchemaInitialise } from "./base/BaseViewModel";
import FieldModel, { fieldSchema, fieldTypeString } from "./base/FieldModel";
import { Map } from "immutable";

type ContactFormSchema = {
  forename: fieldSchema;
  surname: fieldSchema;
  emailAddress: fieldSchema;
  message: fieldSchema;
};

const schemaConfig: FormSchemaInitialise = {
  forename: { caption: "Forename", type: "text" },
  surname: { caption: "Surname", type: "text" },
  emailAddress: { caption: "Email Address", type: "text" },
  message: { caption: "Message", type: "text" },
};

/**
 * The Contact Form is imutable, meaning that it is read only and any
 * changes result in a new instance. With the help of immutable package
 * only the changes fields have a new instance, resulting in faster mutations
 * and reduction in memory changes
 */
export class ContactFormViewModel extends ViewModelBase {
  /****************************************************/
  /* Actual Field Values                              */
  /****************************************************/
  private readonly fields: Map<string, FieldModel>;

  // the schema provides field meta data such as fieldname, ui-caption, data types
  private static readonly schema = this.createSchemaFromConfig<ContactFormSchema>(schemaConfig);

  private constructor(fields: Map<string, FieldModel>) {
    super();
    this.fields = fields;
  }

  /****************************************************/
  /* Initialize ContactFormViewModel with Field Models */
  /****************************************************/

  /**
   * Creates an instance of ContactFormViewModel populated with initial field values.
   *
   * This method dynamically generates a map of FieldModel objects for each form field
   * defined in the ContactFormViewModel schema. It uses the schema configuration to
   * create FieldModels, ensuring that any future changes in the schema will
   * automatically be reflected in the view model setup.
   *
   * Process:
   * 1. `initialValues`: Collects the initial values for each field (forename, surname,
   *    emailAddress, message) into an object, with keys matching schema fields.
   *
   * 2. `fields` Map: Creates an immutable map where each entry corresponds to a field:
   *     - Keys are derived from `ContactFormViewModel.schema`, representing each field name.
   *     - Values are `FieldModel` instances, created using the field's schema and initial value.
   *
   * This approach leverages the `immutable` library, so each field modification results in a
   * new ContactFormViewModel instance with only the modified fields replaced, optimizing performance.
   *
   * @param forename - Initial value for the "forename" field.
   * @param surname - Initial value for the "surname" field.
   * @param emailAddress - Initial value for the "emailAddress" field.
   * @param message - Initial value for the "message" field.
   * @returns {ContactFormViewModel} A new instance of ContactFormViewModel with initialized fields.
   */
  static CreateViewModel(forename: fieldTypeString, surname: fieldTypeString, emailAddress: fieldTypeString, message: fieldTypeString): ContactFormViewModel {
    const initialValues = { forename, surname, emailAddress, message };

    // Map field names to FieldModel instances based on the schema and initial values
    const fields = Map<string, FieldModel>(
      Object.keys(ContactFormViewModel.schema).map((key) => {
        const fieldSchema = ContactFormViewModel.schema[key as keyof ContactFormSchema];
        const fieldValue = initialValues[key as keyof ContactFormSchema];
        return [fieldSchema.fieldName, FieldModel.fromSchema(fieldSchema, fieldValue)];
      }),
    );
    return new ContactFormViewModel(fields);
  }

  static CreateEmptyViewModel(): ContactFormViewModel {
    return this.CreateViewModel("", "", "", "");
  }

  /****************************************************/
  /* GETTERS FOR FIELD VALUES                         *
  /****************************************************/
  get forename(): FieldModel {
    return this.fields.get(ContactFormViewModel.schema.forename.fieldName)!;
  }

  get surname(): FieldModel {
    return this.fields.get(ContactFormViewModel.schema.surname.fieldName)!;
  }

  get emailAddress(): FieldModel {
    return this.fields.get(ContactFormViewModel.schema.emailAddress.fieldName)!;
  }

  get message(): FieldModel {
    return this.fields.get(ContactFormViewModel.schema.message.fieldName)!;
  }

  /****************************************************/
  /* Modify Field Values                              */
  /****************************************************/
  cloneWithField(field: FieldModel): ContactFormViewModel {
    return new ContactFormViewModel(this.fields.set(field.fieldName, field));
  }

  /****************************************************/
  /* Clone Object                                     */
  /****************************************************/
  clone(): ContactFormViewModel {
    return new ContactFormViewModel(this.fields);
  }
}
