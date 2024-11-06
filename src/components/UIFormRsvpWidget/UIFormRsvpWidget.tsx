import { RsvpFormViewModel } from "../../viewModels/RsvpFormViewModel";
import FieldModel from "../../library/packageViewModelp/base/FieldModel";
import React from "react";
import UIField from "../UIField/UIField";
import UISwitch from "../UIField/UISwitch";

interface IProperties {
  value: RsvpFormViewModel;
  onChange: (form: RsvpFormViewModel) => void;
}

const UIFormRsvpWidget: React.FC<IProperties> = ({ value, onChange }) => {
  const handleOnFieldValueChangedEvent = (field: FieldModel) => {
    onChange(value.cloneWithField(field));
  };

  return (
    <div>
      <h2>Guest RSVP Form</h2>
      <div>
        <UIField value={value.guestName} onChange={handleOnFieldValueChangedEvent} />
        <UISwitch value={value.attending} onChange={handleOnFieldValueChangedEvent} />
        <UIField value={value.numberOfGuests} onChange={handleOnFieldValueChangedEvent} />
      </div>
    </div>
  );
};

export default UIFormRsvpWidget;
