import { PartLineViewModel } from "./models/OrderViewModel";
import FieldModel from "../../library/packageViewModelp/base/FieldModel";
import React from "react";
import UIField from "../UIField/UIField";
import UIButton from "../UIButton/UIButton";

interface IProperties {
  value: PartLineViewModel;
  onChange: (form: PartLineViewModel) => void;
}

const UIOrderPartLine: React.FC<IProperties> = ({ value, onChange }) => {
  const handleOnFieldValueChangedEvent = (field: FieldModel) => {
    onChange(value.cloneWithField(field));
  };

  const handleDeleteLineEvent = () => {};

  return (
    <div className="ui-part-line">
      <h3>Part</h3>
      <UIField value={value.code} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.description} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.price} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.quantity} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.discountPercentage} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.lineTotal} onChange={handleOnFieldValueChangedEvent} />
      <UIButton title="Delete" clear onClick={handleDeleteLineEvent} />
    </div>
  );
};

export default UIOrderPartLine;
