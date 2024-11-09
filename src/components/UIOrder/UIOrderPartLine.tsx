import { PartLineViewModel } from "./models/OrderViewModel";
import FieldModel from "../../library/packageViewModelp/base/FieldModel";
import React from "react";
import UIField from "../UIField/UIField";
import UIFormContainer from "../UIField/UIFormContainer";

interface IProperties {
  value: PartLineViewModel;
  onChange: (form: PartLineViewModel) => void;
}

const UIOrderPartLine: React.FC<IProperties> = ({ value, onChange }) => {
  const handleOnFieldValueChangedEvent = (field: FieldModel) => {
    onChange(value.cloneWithField(field));
  };

  return (
    <UIFormContainer title="Part Line">
      <UIField value={value.code} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.description} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.price} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.quantity} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.discountPercentage} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.lineTotal} onChange={handleOnFieldValueChangedEvent} />
    </UIFormContainer>
  );
};

export default UIOrderPartLine;
