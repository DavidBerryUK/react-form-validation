import { List, Record } from "immutable";
import { PartLineViewModel } from "./PartLineViewModel";
import EnumFieldDataType from "../../../library/packageViewModelp/enums/EnumFieldDataType";
import FieldModel from "../../../library/packageViewModelp/base/FieldModel";
import { nanoid } from "nanoid";

//***************************************/
// Labour Line                          */
//***************************************/
interface ILabourLineParameters {
  // key = ui key, id = record id. The record id may not be known, e.g. when a new record is created on the ui.
  id: string;
  key: string;
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
  id: "id",
  key: "key",
  description: "description",
  labourRate: "labourRate",
  hours: "hours",
  partsTotal: "partsTotal",
  labourTotal: "labourTotal",
  lineTotal: "lineTotal",
  partLines: "partLines",
} as const;

// Initial record values
const LabourLineRecord = Record<ILabourLineParameters>({
  id: nanoid(),
  key: "",
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
  /* Constructor to initialize with a unique key    */
  /****************************************************/
  constructor(params?: Partial<ILabourLineParameters>) {
    // Ensure the key is set to a unique value using nanoid()
    const uniqueParams = { ...params, key: nanoid() };
    super(uniqueParams);
  }

  /****************************************************/
  /* Getters
  /****************************************************/
  get key(): string {
    return this.get(labourLineFieldNames.key) as string;
  }

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
    return this.updateCalculations(model);
  }

  /****************************************************/
  /* Part Line Management
    /****************************************************/
  addPartLine(): LabourLineViewModel {
    var model = this.clone();
    model = model.set(labourLineFieldNames.partLines, model.partLines.push(new PartLineViewModel()));
    return model;
  }

  private updateCalculations(model: LabourLineViewModel): LabourLineViewModel {
    // Update Line Total
    var labourRate = model.labourRate.valueAsNumber;
    var hours = model.hours.valueAsNumber;
    if (labourRate && hours) {
      var total = labourRate * hours;
      if (model.lineTotal.valueAsNumber !== total) {
        var field = model.labourTotal.cloneWithValue(total);
        model = model.set(field.fieldName as keyof ILabourLineParameters, field) as LabourLineViewModel;
      }
    }

    return model;
  }
}
