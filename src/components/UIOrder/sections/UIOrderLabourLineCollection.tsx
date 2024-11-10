import { LabourLineViewModel } from "../models/LabourLineViewModel";
import OrderViewModel from "../models/OrderViewModel";
import React from "react";
import UIOrderLabourLine from "./UIOrderLabourLine";
import UIButton from "../../UIButton/UIButton";

interface IProperties {
  value: OrderViewModel;
  onChange: (form: OrderViewModel) => void;
}

const UIOrderLabourLineCollection: React.FC<IProperties> = ({ value, onChange }) => {
  const handleOnLabourLineChange = (labourLine: LabourLineViewModel) => {
    const model = value.updateLabourLine(labourLine);
    onChange(model);
  };

  const handleAddLabourLine = () => {
    onChange(value.addLabourLine());
  };

  return (
    <div className="ui-labour-lines-container">
      <UIButton title="Add Labour Line" clear onClick={handleAddLabourLine} />
      {value.labourLines.map((line) => (
        <UIOrderLabourLine key={line.key} value={line} onChange={handleOnLabourLineChange} />
      ))}
    </div>
  );
};

export default UIOrderLabourLineCollection;
