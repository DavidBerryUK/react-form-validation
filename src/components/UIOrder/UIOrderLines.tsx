import { LabourLineViewModel } from "./models/LabourLineViewModel";
import FieldModel from "../../library/packageViewModelp/base/FieldModel";
import OrderViewModel from "./models/OrderViewModel";
import React from "react";
import UIButton from "../UIButton/UIButton";
import UIField from "../UIField/UIField";
import UIOrderLabourLine from "./UIOrderLabourLine";

interface IProperties {
  value: OrderViewModel;
  onChange: (form: OrderViewModel) => void;
}

const UIOrderLines: React.FC<IProperties> = ({ value, onChange }) => {
  const handleOnFieldValueChangedEvent = (field: FieldModel) => {
    onChange(value.cloneWithField(field));
  };

  const handleAddLabourLine = () => {
    onChange(value.addLabourLine());
  };

  const handleOnLabourLineChange = (value: LabourLineViewModel) => {};

  return (
    <div className="ui-order-lines">
      <h3>Order</h3>
      <div>labour lines:{value.labourLines.count()}</div>
      <UIField value={value.customer} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.supplier} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.partsTotal} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.labourTotal} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.orderTotal} onChange={handleOnFieldValueChangedEvent} />
      <UIButton title="Add Labour" clear onClick={handleAddLabourLine} />
      <div>
        {value.labourLines.map((line) => (
          <UIOrderLabourLine key={line.key} value={line} onChange={handleOnLabourLineChange} />
        ))}
      </div>
    </div>
  );
};

export default UIOrderLines;
