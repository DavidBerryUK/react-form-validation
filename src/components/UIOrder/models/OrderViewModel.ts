import { LabourLineViewModel } from "./LabourLineViewModel";
import { List, Record } from "immutable";
import EnumFieldDataType from "../../../library/packageViewModelp/enums/EnumFieldDataType";
import FieldModel from "../../../library/packageViewModelp/base/FieldModel";
import { nanoid } from "nanoid";

//***************************************/
// Order                                */
//***************************************/

interface IOrderParameters {
  // key = ui key, id = record id. The record id may not be known, e.g. when a new record is created on the ui.
  id: string;
  key: string;
  // properties
  registration: FieldModel;
  customer: FieldModel;
  supplier: FieldModel;
  labourTotal: FieldModel;
  partsTotal: FieldModel;
  orderTotal: FieldModel;
  // collections
  labourLines: List<LabourLineViewModel>;
}

type orderFieldNamesType = keyof IOrderParameters;

const orderFieldNames: { [key in orderFieldNamesType]: orderFieldNamesType } = {
  id: "id",
  key: "key",
  registration: "registration",
  customer: "customer",
  supplier: "supplier",
  partsTotal: "partsTotal",
  orderTotal: "orderTotal",
  labourTotal: "labourTotal",
  labourLines: "labourLines",
};

// Initial record values
const OrderRecord = Record<IOrderParameters>({
  id: nanoid(),
  key: "",
  registration: FieldModel.create(orderFieldNames.registration, "Registration", EnumFieldDataType.string, ""),
  customer: FieldModel.create(orderFieldNames.customer, "Customer", EnumFieldDataType.string, ""),
  supplier: FieldModel.create(orderFieldNames.supplier, "Supplier", EnumFieldDataType.string, ""),
  labourTotal: FieldModel.create(orderFieldNames.labourTotal, "Labour Total", EnumFieldDataType.number, ""),
  partsTotal: FieldModel.create(orderFieldNames.partsTotal, "Parts Total", EnumFieldDataType.number, ""),
  orderTotal: FieldModel.create(orderFieldNames.orderTotal, "Order Total", EnumFieldDataType.number, ""),
  // collections
  labourLines: List<LabourLineViewModel>(),
});

export default class OrderViewModel extends OrderRecord {
  /****************************************************/
  /* Constructor to initialize with a unique key    */
  /****************************************************/
  constructor(params?: Partial<IOrderParameters>) {
    // Ensure the key is set to a unique value using nanoid()
    const uniqueParams = { ...params, key: nanoid() };
    super(uniqueParams);
  }

  /****************************************************/
  /* Getters
  /****************************************************/
  get registration(): FieldModel {
    return this.get(orderFieldNames.registration) as FieldModel;
  }

  get customer(): FieldModel {
    return this.get(orderFieldNames.customer) as FieldModel;
  }

  get supplier(): FieldModel {
    return this.get(orderFieldNames.supplier) as FieldModel;
  }

  get labourTotal(): FieldModel {
    return this.get(orderFieldNames.labourTotal) as FieldModel;
  }

  get partsTotal(): FieldModel {
    return this.get(orderFieldNames.partsTotal) as FieldModel;
  }

  get orderTotal(): FieldModel {
    return this.get(orderFieldNames.orderTotal) as FieldModel;
  }

  get labourLines(): List<LabourLineViewModel> {
    return this.get(orderFieldNames.labourLines) as List<LabourLineViewModel>;
  }
  /****************************************************/
  /* Labour Line Management
  /****************************************************/
  addLabourLine(): OrderViewModel {
    var model = this.clone();
    model = model.set(orderFieldNames.labourLines, model.labourLines.push(new LabourLineViewModel()));
    return model;
  }

  updateLabourLine(labourLine: LabourLineViewModel): OrderViewModel {
    const index = this.labourLines.findIndex((line) => line.key === labourLine.key);
    if (index === -1) {
      console.warn("Labour line not found.");
      return this;
    }
    const model = this.set(orderFieldNames.labourLines, this.labourLines.set(index, labourLine));
    return model;
  }

  /****************************************************/
  /* Clone Object                                     */
  /****************************************************/
  clone(): OrderViewModel {
    return new OrderViewModel({
      registration: this.registration,
      customer: this.customer,
      supplier: this.supplier,
      labourTotal: this.labourTotal,
      partsTotal: this.partsTotal,
      orderTotal: this.orderTotal,
      labourLines: this.labourLines,
    });
  }

  cloneWithField(field: FieldModel): OrderViewModel {
    const model = this.set(field.fieldName as keyof IOrderParameters, field) as OrderViewModel;
    return model;
  }
}
