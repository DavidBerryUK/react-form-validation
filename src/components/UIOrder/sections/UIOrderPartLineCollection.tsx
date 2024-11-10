import { LabourLineViewModel } from "../models/LabourLineViewModel";
import { PartLineViewModel } from "../models/PartLineViewModel";
import React from "react";
import UIOrderPartLine from "./UIOrderPartLine";

interface IProperties {
  value: LabourLineViewModel;
  onChange: (form: LabourLineViewModel) => void;
}

const UIOrderPartLineCollection: React.FC<IProperties> = ({ value, onChange }) => {
  const handleOnPartLineChangeEvent = (partLine: PartLineViewModel) => {
    const model = value.updatePartLine(partLine);
    onChange(model);
  };

  return (
    <div className="ui-order-part-line-collection">
      {value.partLines.map((line) => (
        <UIOrderPartLine key={line.key} value={line} onChange={handleOnPartLineChangeEvent} />
      ))}
    </div>
  );
};

export default UIOrderPartLineCollection;
