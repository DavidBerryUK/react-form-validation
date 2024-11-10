import { List, Record } from "immutable";
import { nanoid } from "nanoid";
import { PartLineViewModel } from "./PartLineViewModel";
import EnumFieldDataType from "../../../library/packageViewModelp/enums/EnumFieldDataType";
import FieldModel from "../../../library/packageViewModelp/base/FieldModel";

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
  /* Constructor to initialize with a unique key      */
  /****************************************************/
  constructor(params?: Partial<ILabourLineParameters>) {
    const initParams = Object.assign({}, params, { key: params?.key ?? nanoid() });
    super(initParams);
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
      id: this.id,
      key: this.key,
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
    return model.updateCalculations(model);
  }

  /****************************************************/
  /* Part Line Management
    /****************************************************/
  addPartLine(): LabourLineViewModel {
    var model = this.clone();
    model = model.set(labourLineFieldNames.partLines, model.partLines.push(new PartLineViewModel()));
    model = model.updateCalculations(model);
    return model;
  }

  updatePartLine(partLine: PartLineViewModel): LabourLineViewModel {
    const index = this.partLines.findIndex((line) => line.key === partLine.key);
    if (index === -1) {
      console.warn("part line not found.");
      return this;
    }
    var model = this as LabourLineViewModel;
    model = model.set(labourLineFieldNames.partLines, this.partLines.set(index, partLine));
    model = model.updateCalculations(model);
    return model;
  }

  deletePartLine(partLine: PartLineViewModel): LabourLineViewModel {
    const index = this.partLines.findIndex((line) => line.key === partLine.key);
    if (index === -1) {
      console.warn("Part line not found.");
      return this;
    }
    var model = this as LabourLineViewModel;
    model = model.set(labourLineFieldNames.partLines, model.partLines.delete(index));
    model = model.updateCalculations(model);
    return model;
  }

  /****************************************************/
  /* Calculations to run each time model is changed   */
  /****************************************************/
  private updateCalculations(model: LabourLineViewModel): LabourLineViewModel {
    model = model.updatePartsTotalfield(model);
    model = model.updateLabourTotalfield(model);
    model = model.updateLineTotalfield(model);
    return model;
  }

  private updatePartsTotalfield(model: LabourLineViewModel): LabourLineViewModel {
    var partsTotal = 0;
    model.partLines.forEach((line) => {
      const lineTotal = line.lineTotal.valueAsNumber ?? 0;
      partsTotal = partsTotal + lineTotal;
    });
    if (model.partsTotal.valueAsNumber !== partsTotal) {
      var field = model.partsTotal.cloneWithValue(partsTotal);
      model = model.set(field.fieldName as keyof ILabourLineParameters, field);
    }
    return model;
  }

  private updateLineTotalfield(model: LabourLineViewModel): LabourLineViewModel {
    var labourTotal = model.labourTotal.valueAsNumber ?? 0;
    var partsTotal = model.partsTotal.valueAsNumber ?? 0;
    var lineTotal = labourTotal + partsTotal;

    if (model.lineTotal.valueAsNumber !== lineTotal) {
      var field = model.lineTotal.cloneWithValue(lineTotal);
      model = model.set(field.fieldName as keyof ILabourLineParameters, field) as LabourLineViewModel;
    }

    return model;
  }

  private updateLabourTotalfield(model: LabourLineViewModel): LabourLineViewModel {
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
