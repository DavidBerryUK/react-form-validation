import EnumFieldDataType from "../library/packageViewModelp/enums/EnumFieldDataType";
import FieldModel from "../library/packageViewModelp/base/FieldModel";
import FieldSchema from "../library/packageViewModelp/base/FieldSchema";

import RuleMandatory from "../library/packageViewModelp/validation/rules/RuleMandatory";
import RuleMaxLength from "../library/packageViewModelp/validation/rules/RuleMaxLength";
import RuleMinLength from "../library/packageViewModelp/validation/rules/RuleMinLength";
import BaseViewModel from "../library/packageViewModelp/base/BaseViewModel";
import ViewModelSchema, { SchemaBase } from "../library/packageViewModelp/base/ViewModelSchema";
import RulePositive from "../library/packageViewModelp/validation/rules/RulePositive";
import RuleDecimal from "../library/packageViewModelp/validation/rules/RuleDecimal";

class ShoppingListLineModelSchema extends ViewModelSchema {
  fields: SchemaBase = {
    product: new FieldSchema("Product", EnumFieldDataType.string, [new RuleMandatory(), new RuleMinLength(2), new RuleMaxLength(100)]),
    price: new FieldSchema("Price", EnumFieldDataType.number, [new RulePositive(true), new RuleDecimal()]),
    quantity: new FieldSchema("Quantity", EnumFieldDataType.number, [new RulePositive(true)]),
    total: new FieldSchema("Total", EnumFieldDataType.number, [new RulePositive(true)]),
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
export class ShoppingListLineViewModel extends BaseViewModel<ShoppingListLineViewModel> {
  // the schema provides field meta data such as fieldname, ui-caption, data types

  static modelSchema = new ShoppingListLineModelSchema();

  /****************************************************/
  /* Initialize ShoppingListLineViewModel with Field Models */
  /****************************************************/

  /**
   
   * @returns {ShoppingListLineViewModel} A new instance of ShoppingListLineViewModel with initialized fields.
   */
  static createViewModel(product: string, price: number, quantity: number): ShoppingListLineViewModel {
    // Define the type for initialValues based on the keys of the modelSchema fields
    const initialValues: {
      // this ensures that initial values are spelt correctly
      [K in keyof ShoppingListLineViewModel["fields"]]: ShoppingListLineViewModel["fields"][K];
    } = {
      product,
      price,
      quantity,
      total: 0,
    } as any;

    var form = ShoppingListLineViewModel.create(this.createInitialFields(this.modelSchema, initialValues));
    return form;
  }

  static CreateEmptyViewModel(): ShoppingListLineViewModel {
    return this.createViewModel("", 0, 0);
  }

  /****************************************************/
  /* GETTERS FOR FIELD VALUES                         *
  /****************************************************/

  get product(): FieldModel {
    return this.fields.get(ShoppingListLineViewModel.modelSchema.fields.product.fieldName)!;
  }

  get price(): FieldModel {
    return this.fields.get(ShoppingListLineViewModel.modelSchema.fields.price.fieldName)!;
  }

  get quantity(): FieldModel {
    return this.fields.get(ShoppingListLineViewModel.modelSchema.fields.quantity.fieldName)!;
  }

  get total(): FieldModel {
    return this.fields.get(ShoppingListLineViewModel.modelSchema.fields.total.fieldName)!;
  }

  /****************************************************/
  /* Form Events                                      */
  /****************************************************/
  onFieldUpdated(model: ShoppingListLineViewModel, oldField: FieldModel, newField: FieldModel): ShoppingListLineViewModel {
    model = this.updateTotal(model);

    return model;
  }

  onInitialise(model: ShoppingListLineViewModel): ShoppingListLineViewModel {
    model = model.updateTotal(model);
    return model;
  }

  /****************************************************/
  /* Update Totals
  /****************************************************/
  updateTotal(model: ShoppingListLineViewModel): ShoppingListLineViewModel {
    let price = model.price.valueAsNumber;
    let quantity = model.quantity.valueAsNumber;

    if (price && quantity) {
      let total = price * quantity;
      if (total !== model.total.valueAsNumber) {
        model = model.cloneWithField(model.total.cloneWithValue(total));
      }
    }

    return model;
  }
}
