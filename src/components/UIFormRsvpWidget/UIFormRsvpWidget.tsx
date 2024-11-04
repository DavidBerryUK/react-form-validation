import { RsvpFormViewModel } from "../../viewModels/RsvpFormViewModel";
import FieldModel from "../../library/packageViewModelp/base/FieldModel";
import React from "react";
import UIField from "../UIField/UIField";
import UIShowIfTrue from "../UIShowIfTrue/UIShowIfTrue";

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
        <UIField value={value.attending} onChange={handleOnFieldValueChangedEvent} />
        <UIShowIfTrue field={value.attending}>
          <UIField value={value.numberOfGuests} onChange={handleOnFieldValueChangedEvent} />
        </UIShowIfTrue>
      </div>
    </div>
  );
};

export default UIFormRsvpWidget;
