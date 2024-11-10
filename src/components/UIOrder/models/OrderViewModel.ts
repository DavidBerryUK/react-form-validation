import { LabourLineViewModel } from "./LabourLineViewModel";
import { List, Record } from "immutable";
import { nanoid } from "nanoid";
import EnumFieldDataType from "../../../library/packageViewModelp/enums/EnumFieldDataType";
import FieldModel from "../../../library/packageViewModelp/base/FieldModel";

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
    // Only assign a new key if it's not provided in params
    const uniqueParams = { ...params, key: params?.key || nanoid() };
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
    var model = this.set(orderFieldNames.labourLines, this.labourLines.push(new LabourLineViewModel())) as OrderViewModel;
    model = this.updateCalculations(model);
    return model;
  }

  deleteLabourLine(labourLine: LabourLineViewModel): OrderViewModel {
    const index = this.labourLines.findIndex((line) => line.key === labourLine.key);
    if (index === -1) {
      console.warn("Labour line not found.");
      return this;
    }
    var model = this as OrderViewModel;
    model = model.set(orderFieldNames.labourLines, this.labourLines.delete(index));
    model = model.updateCalculations(model);
    return model;
  }

  updateLabourLine(labourLine: LabourLineViewModel): OrderViewModel {
    const index = this.labourLines.findIndex((line) => line.key === labourLine.key);
    if (index === -1) {
      console.warn("Labour line not found.");
      return this;
    }
    var model = this as OrderViewModel;
    model = model.set(orderFieldNames.labourLines, model.labourLines.set(index, labourLine));
    model = model.updateCalculations(model);
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

  /****************************************************/
  /* Calculations to run each time model is changed   */
  /****************************************************/
  private updateCalculations(model: OrderViewModel): OrderViewModel {
    model = this.updateLabourAndPartsTotalfield(model);
    return model;
  }

  private updateLabourAndPartsTotalfield(model: OrderViewModel): OrderViewModel {
    var partsTotal = 0;
    var labourTotal = 0;
    model.labourLines.forEach((line, index) => {
      var linePartTotal = line.partsTotal.valueAsNumber ?? 0;
      var lineLabourTotal = line.labourTotal.valueAsNumber ?? 0;
      partsTotal = partsTotal + linePartTotal;
      labourTotal = labourTotal + lineLabourTotal;
    });

    if (model.partsTotal.valueAsNumber !== partsTotal) {
      var partsTotalField = model.partsTotal.cloneWithValue(partsTotal);
      model = model.set(partsTotalField.fieldName as keyof IOrderParameters, partsTotalField) as OrderViewModel;
    }
    if (model.labourTotal.valueAsNumber !== labourTotal) {
      var labourTotalField = model.labourTotal.cloneWithValue(labourTotal);
      model = model.set(labourTotalField.fieldName as keyof IOrderParameters, labourTotalField) as OrderViewModel;
    }

    return model;
  }
}
