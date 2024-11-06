import { ContactFormViewModel } from "../../viewModels/ContactFormViewModel";
import FieldModel from "../../library/packageViewModelp/base/FieldModel";
import React from "react";
import UIField from "../UIField/UIField";
import UIFormContainer from "../UIField/UIFormContainer";
import UIButton from "../UIButton/UIButton";
import UIToolbar from "../UIToolbar/UIToolbar";

interface IProperties {
  value: ContactFormViewModel;
  onChange: (form: ContactFormViewModel) => void;
}

const UIFormContactWidget: React.FC<IProperties> = ({ value, onChange }) => {
  const handleOnFieldValueChangedEvent = (field: FieldModel) => {
    onChange(value.cloneWithField(field));
  };

  const handleOnSubmitEvent = () => {
    onChange(value.cloneWithValidateAll());
  };

  const handleOnClearEvent = () => {
    onChange(value.cloneWithClearAll());
  };

  return (
    <UIFormContainer title="Contact Form">
      <UIField value={value.forename} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.surname} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.emailAddress} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.message} onChange={handleOnFieldValueChangedEvent} />
      <UIToolbar>
        <UIButton title="Clear" clear onClick={handleOnClearEvent} />
        <UIButton title="Submit" submit onClick={handleOnSubmitEvent} />
      </UIToolbar>
    </UIFormContainer>
  );
};

export default UIFormContactWidget;
