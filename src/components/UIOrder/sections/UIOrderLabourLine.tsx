import { LabourLineViewModel } from "../models/LabourLineViewModel";
import FieldModel from "../../../library/packageViewModelp/base/FieldModel";
import React from "react";
import UIButton from "../../UIButton/UIButton";
import UIField from "../../UIField/UIField";
import UIOrderPartLineCollection from "./UIOrderPartLineCollection";

interface IProperties {
  value: LabourLineViewModel;
  onChange: (value: LabourLineViewModel) => void;
  onDelete: (value: LabourLineViewModel) => void;
}

const UIOrderLabourLine: React.FC<IProperties> = ({ value, onChange, onDelete }) => {
  const handleOnFieldValueChangedEvent = (field: FieldModel) => {
    onChange(value.cloneWithField(field));
  };

  const handleAddPartLineEvent = () => {
    const model = value.addPartLine();
    onChange(model);
  };

  const handlePartLineUpdatedEvent = (labourLine: LabourLineViewModel) => {
    onChange(labourLine);
  };

  const handleDeleteLineEvent = () => {
    onDelete(value);
  };

  return (
    <div className="ui-labour-line">
      <div className="field-container">
        <h3>Labour Line</h3>
        <div>parts:{value.partLines.count()}</div>
        <UIField value={value.description} onChange={handleOnFieldValueChangedEvent} />
        <UIField value={value.labourRate} onChange={handleOnFieldValueChangedEvent} />
        <UIField value={value.hours} onChange={handleOnFieldValueChangedEvent} />
        <UIField value={value.labourTotal} onChange={handleOnFieldValueChangedEvent} />
        <UIField value={value.partsTotal} onChange={handleOnFieldValueChangedEvent} />
        <UIField value={value.lineTotal} onChange={handleOnFieldValueChangedEvent} />
        <UIButton title="Add Part Line" clear onClick={handleAddPartLineEvent} />
        <UIButton title="Delete" clear onClick={handleDeleteLineEvent} />
      </div>
      <UIOrderPartLineCollection value={value} onChange={handlePartLineUpdatedEvent} />
    </div>
  );
};

export default UIOrderLabourLine;
