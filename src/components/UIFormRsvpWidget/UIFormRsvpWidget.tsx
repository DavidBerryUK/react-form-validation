import { RsvpFormViewModel } from "../../viewModels/RsvpFormViewModel";
import FieldModel from "../../library/packageViewModelp/base/FieldModel";
import React from "react";
import UIButton from "../UIButton/UIButton";
import UIField from "../UIField/UIField";
import UIFormContainer from "../UIField/UIFormContainer";
import UISwitch from "../UIField/UISwitch";
import UIToolbar from "../UIToolbar/UIToolbar";

interface IProperties {
  value: RsvpFormViewModel;
  onChange: (form: RsvpFormViewModel) => void;
}

const UIFormRsvpWidget: React.FC<IProperties> = ({ value, onChange }) => {
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
    <UIFormContainer title="Guest RSVP Form">
      <UIField value={value.guestName} onChange={handleOnFieldValueChangedEvent} />
      <UISwitch value={value.attending} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.numberOfGuests} onChange={handleOnFieldValueChangedEvent} />
      <UIToolbar>
        <UIButton title="Clear" clear onClick={handleOnClearEvent} />
        <UIButton title="Submit" submit onClick={handleOnSubmitEvent} />
      </UIToolbar>
    </UIFormContainer>
  );
};

export default UIFormRsvpWidget;
