import { ContactFormViewModel } from "../../viewModels/ContactFormViewModel";
import FieldModel from "../../library/packageViewModelp/base/FieldModel";
import React from "react";
import UIField from "../UIField/UIField";

interface IProperties {
  value: ContactFormViewModel;
  onChange: (form: ContactFormViewModel) => void;
}

const UIFormContactWidget: React.FC<IProperties> = ({ value, onChange }) => {
  const handleOnFieldValueChangedEvent = (field: FieldModel) => {
    onChange(value.cloneWithField(field));
  };

  return (
    <div>
      <h2>Contact Form</h2>
      <div>
        <UIField value={value.forename} onChange={handleOnFieldValueChangedEvent} />
        <UIField value={value.surname} onChange={handleOnFieldValueChangedEvent} />
        <UIField value={value.emailAddress} onChange={handleOnFieldValueChangedEvent} />
        <UIField value={value.message} onChange={handleOnFieldValueChangedEvent} />
      </div>
    </div>
  );
};

export default UIFormContactWidget;
