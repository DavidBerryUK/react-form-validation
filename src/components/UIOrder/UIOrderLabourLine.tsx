import { LabourLineViewModel } from "./models/LabourLineViewModel";
import { PartLineViewModel } from "./models/PartLineViewModel";
import FieldModel from "../../library/packageViewModelp/base/FieldModel";
import React from "react";
import UIButton from "../UIButton/UIButton";
import UIField from "../UIField/UIField";
import UIOrderPartLine from "./UIOrderPartLine";

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

  const handleOnPartLineChangeEvent = (value: PartLineViewModel) => {};

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
      <div>
        {value.partLines.map((line) => (
          <UIOrderPartLine key={line.key} value={line} onChange={handleOnPartLineChangeEvent} />
        ))}
      </div>
    </div>
  );
};

export default UIOrderLabourLine;
