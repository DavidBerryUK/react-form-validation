//***************************************/
// Part Line                            */
//***************************************/
import { List, Record } from "immutable";
import FieldModel from "../../../library/packageViewModelp/base/FieldModel";
import EnumFieldDataType from "../../../library/packageViewModelp/enums/EnumFieldDataType";

interface IPartLineParameters {
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
  code: "code",
  description: "description",
  price: "price",
  quantity: "quantity",
  discountPercentage: "discountPercentage",
  lineTotal: "lineTotal",
};

const PartLineRecord = Record<IPartLineParameters>({
  code: FieldModel.create(partLineFieldNames.code, "Code", EnumFieldDataType.string, ""),
  description: FieldModel.create(partLineFieldNames.description, "Description", EnumFieldDataType.string, ""),
  price: FieldModel.create(partLineFieldNames.price, "Price", EnumFieldDataType.number, ""),
  quantity: FieldModel.create(partLineFieldNames.quantity, "Quantity", EnumFieldDataType.number, ""),
  discountPercentage: FieldModel.create(partLineFieldNames.discountPercentage, "Discount Percentage", EnumFieldDataType.number, ""),
  lineTotal: FieldModel.create(partLineFieldNames.lineTotal, "Line Total", EnumFieldDataType.number, ""),
});

export class PartLineViewModel extends PartLineRecord {
  /****************************************************/
  /* Getters
  /****************************************************/
  get code(): FieldModel {
    return this.get(partLineFieldNames.code);
  }
  get description(): FieldModel {
    return this.get(partLineFieldNames.description);
  }
  get price(): FieldModel {
    return this.get(partLineFieldNames.price);
  }
  get quantity(): FieldModel {
    return this.get(partLineFieldNames.quantity);
  }
  get discountPercentage(): FieldModel {
    return this.get(partLineFieldNames.discountPercentage);
  }
  get lineTotal(): FieldModel {
    return this.get(partLineFieldNames.lineTotal);
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
    const model = this.set(field.fieldName as keyof IPartLineParameters, field) as PartLineViewModel;
    return model;
  }
}

//***************************************/
// Labour Line                          */
//***************************************/

interface ILabourLineParameters {
  // properties
  description: FieldModel;
  labourRate: FieldModel;
  hours: FieldModel;
  labourTotal: FieldModel;
  partsTotal: FieldModel;
  lineTotal: FieldModel;
  // collections
  partLines: List<PartLineViewModel>;
}

type LabourLineFieldNamesType = keyof ILabourLineParameters;

const labourLineFieldNames: { [key in LabourLineFieldNamesType]: LabourLineFieldNamesType } = {
  description: "description",
  labourRate: "labourRate",
  hours: "hours",
  partsTotal: "partsTotal",
  labourTotal: "labourTotal",
  lineTotal: "lineTotal",
  partLines: "partLines",
} as const;

const LabourLineRecord = Record<ILabourLineParameters>({
  description: FieldModel.create(labourLineFieldNames.description, "Description", EnumFieldDataType.string, ""),
  labourRate: FieldModel.create(labourLineFieldNames.labourRate, "Labour Rate", EnumFieldDataType.number, ""),
  hours: FieldModel.create(labourLineFieldNames.hours, "hours", EnumFieldDataType.number, ""),
  labourTotal: FieldModel.create(labourLineFieldNames.labourTotal, "Labour Total", EnumFieldDataType.number, ""),
  partsTotal: FieldModel.create(labourLineFieldNames.partsTotal, "Parts Total", EnumFieldDataType.number, ""),
  lineTotal: FieldModel.create(labourLineFieldNames.lineTotal, "Line Total", EnumFieldDataType.number, ""),
  // collections
  partLines: List<PartLineViewModel>(),
});

export class LabourLineViewModel extends LabourLineRecord {
  /****************************************************/
  /* Getters
  /****************************************************/
  get description(): FieldModel {
    return this.get(labourLineFieldNames.description) as FieldModel;
  }

  get labourRate(): FieldModel {
    return this.get(labourLineFieldNames.labourRate) as FieldModel;
  }

  get hours(): FieldModel {
    return this.get(labourLineFieldNames.hours) as FieldModel;
  }

  get labourTotal(): FieldModel {
    return this.get(labourLineFieldNames.labourTotal) as FieldModel;
  }

  get partsTotal(): FieldModel {
    return this.get(labourLineFieldNames.partsTotal) as FieldModel;
  }

  get lineTotal(): FieldModel {
    return this.get(labourLineFieldNames.lineTotal) as FieldModel;
  }

  get partLines(): List<PartLineViewModel> {
    return this.get(labourLineFieldNames.partLines) as List<PartLineViewModel>;
  }

  /****************************************************/
  /* Clone Object                                     */
  /****************************************************/
  clone(): LabourLineViewModel {
    return new LabourLineViewModel({
      description: this.description,
      labourRate: this.labourRate,
      hours: this.hours,
      labourTotal: this.labourTotal,
      partsTotal: this.partsTotal,
      lineTotal: this.lineTotal,
      partLines: this.partLines.map((partLine) => partLine.clone()).toList(),
    });
  }

  cloneWithField(field: FieldModel): LabourLineViewModel {
    const model = this.set(field.fieldName as keyof ILabourLineParameters, field) as LabourLineViewModel;
    return model;
  }
}

//***************************************/
// Order                                */
//***************************************/

interface IOrderParameters {
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
  registration: "registration",
  customer: "customer",
  supplier: "supplier",
  partsTotal: "partsTotal",
  orderTotal: "orderTotal",
  labourTotal: "labourTotal",
  labourLines: "labourLines",
};

const OrderRecord = Record<IOrderParameters>({
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
