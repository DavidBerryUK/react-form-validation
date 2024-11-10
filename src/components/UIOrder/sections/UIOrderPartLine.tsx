import { PartLineViewModel } from "../models/PartLineViewModel";
import FieldModel from "../../../library/packageViewModelp/base/FieldModel";
import React from "react";
import UIButton from "../../UIButton/UIButton";
import UIField from "../../UIField/UIField";

interface IProperties {
  value: PartLineViewModel;
  onChange: (form: PartLineViewModel) => void;
  onDelete: (value: PartLineViewModel) => void;
}

const UIOrderPartLine: React.FC<IProperties> = ({ value, onChange, onDelete }) => {
  const handleOnFieldValueChangedEvent = (field: FieldModel) => {
    onChange(value.cloneWithField(field));
  };

  const handleDeleteLineEvent = () => {
    onDelete(value);
  };

  return (
    <div className="ui-part-line">
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
