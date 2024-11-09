import { Record } from "immutable";
import FieldModel from "../../../library/packageViewModelp/base/FieldModel";
import EnumFieldDataType from "../../../library/packageViewModelp/enums/EnumFieldDataType";
import { nanoid } from "nanoid";

//***************************************/
// Part Line                            */
//***************************************/

interface IPartLineParameters {
  // key = ui key, id = record id. The record id may not be known, e.g. when a new record is created on the ui.
  id: string;
  key: string;
  // properties
  code: FieldModel;
  description: FieldModel;
  price: FieldModel;
  quantity: FieldModel;
  discountPercentage: FieldModel;
  lineTotal: FieldModel;
}

type PartLineFieldNamesType = keyof IPartLineParameters;

const partLineFieldNames: { [key in PartLineFieldNamesType]: PartLineFieldNamesType } = {
  id: "id",
  key: "key",
  code: "code",
  description: "description",
  price: "price",
  quantity: "quantity",
  discountPercentage: "discountPercentage",
  lineTotal: "lineTotal",
};

// Initial record values
const PartLineRecord = Record<IPartLineParameters>({
  id: "",
  key: "",
  code: FieldModel.create(partLineFieldNames.code, "Code", EnumFieldDataType.string, ""),
  description: FieldModel.create(partLineFieldNames.description, "Description", EnumFieldDataType.string, ""),
  price: FieldModel.create(partLineFieldNames.price, "Price", EnumFieldDataType.number, ""),
  quantity: FieldModel.create(partLineFieldNames.quantity, "Quantity", EnumFieldDataType.number, ""),
  discountPercentage: FieldModel.create(partLineFieldNames.discountPercentage, "Discount Percentage", EnumFieldDataType.number, ""),
  lineTotal: FieldModel.create(partLineFieldNames.lineTotal, "Line Total", EnumFieldDataType.number, ""),
});

export class PartLineViewModel extends PartLineRecord {
  /****************************************************/
  /* Constructor to initialize with a unique key    */
  /****************************************************/
  constructor(params?: Partial<IPartLineParameters>) {
    // Ensure the key is set to a unique value using nanoid()
    const uniqueParams = { ...params, key: nanoid() };
    super(uniqueParams);
  }

  /****************************************************/
  /* Getters
  /****************************************************/
  get key(): string {
    return this.get(partLineFieldNames.key) as string;
  }

  get code(): FieldModel {
    return this.get(partLineFieldNames.code) as FieldModel;
  }

  get description(): FieldModel {
    return this.get(partLineFieldNames.description) as FieldModel;
  }

  get price(): FieldModel {
    return this.get(partLineFieldNames.price) as FieldModel;
  }

  get quantity(): FieldModel {
    return this.get(partLineFieldNames.quantity) as FieldModel;
  }

  get discountPercentage(): FieldModel {
    return this.get(partLineFieldNames.discountPercentage) as FieldModel;
  }

  get lineTotal(): FieldModel {
    return this.get(partLineFieldNames.lineTotal) as FieldModel;
  }

  /****************************************************/
  /* Clone Object                                     */
  /****************************************************/
  clone(): PartLineViewModel {
    return new PartLineViewModel({
      code: this.code,
      description: this.description,
      price: this.price,
      quantity: this.quantity,
      discountPercentage: this.discountPercentage,
      lineTotal: this.lineTotal,
    });
  }

  cloneWithField(field: FieldModel): PartLineViewModel {
    var model = this.set(field.fieldName as keyof IPartLineParameters, field) as PartLineViewModel;
    model = model.updateCalculations(model);
    return model;
  }

  private updateCalculations(model: PartLineViewModel): PartLineViewModel {
    // Update Line Total
    var price = model.price.valueAsNumber;
    var quantity = model.quantity.valueAsNumber;
    if (price && quantity) {
      var total = price * quantity;
      if (model.lineTotal.valueAsNumber !== total) {
        var field = model.lineTotal.cloneWithValue(total);
        model = model.set(field.fieldName as keyof IPartLineParameters, field) as PartLineViewModel;
      }
    }

    return model;
  }
}