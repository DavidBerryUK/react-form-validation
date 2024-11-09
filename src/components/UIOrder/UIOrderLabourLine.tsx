import { LabourLineViewModel } from "./models/OrderViewModel";
import FieldModel from "../../library/packageViewModelp/base/FieldModel";
import React from "react";
import UIField from "../UIField/UIField";
import UIButton from "../UIButton/UIButton";

interface IProperties {
  value: LabourLineViewModel;
  onChange: (form: LabourLineViewModel) => void;
}

const UIOrderLabourLine: React.FC<IProperties> = ({ value, onChange }) => {
  const handleOnFieldValueChangedEvent = (field: FieldModel) => {
    onChange(value.cloneWithField(field));
  };

  const handleAddPartLineEvent = () => {
    onChange(value.addPartLine());
  };

  const handleDeleteLineEvent = () => {
    //onchange(value.addNewPartLine());
  };

  return (
    <div className="ui-labour-line">
      <h3>Labour Line </h3>
      <div>parts:{value.partLines.count()}</div>
      <UIField value={value.description} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.labourRate} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.hours} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.labourTotal} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.lineTotal} onChange={handleOnFieldValueChangedEvent} />
      <UIButton title="Add Part" clear onClick={handleAddPartLineEvent} />
      <UIButton title="Delete" clear onClick={handleDeleteLineEvent} />
    </div>
  );
};

export default UIOrderLabourLine;
