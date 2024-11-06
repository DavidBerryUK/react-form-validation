import FieldModel from "../../library/packageViewModelp/base/FieldModel";
import React from "react";
import UIButton from "../UIButton/UIButton";
import UIField from "../UIField/UIField";
import UIFormContainer from "../UIField/UIFormContainer";
import UIToolbar from "../UIToolbar/UIToolbar";
import { ShoppingListLineViewModel } from "../../viewModels/ShoppingListLineViewModel";

interface IProperties {
  value: ShoppingListLineViewModel;
  onChange: (form: ShoppingListLineViewModel) => void;
}

const UIShoppingListLine: React.FC<IProperties> = ({ value, onChange }) => {
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
    <UIFormContainer title="Shopping List">
      <UIField value={value.product} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.price} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.quantity} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.total} onChange={handleOnFieldValueChangedEvent} />
      <UIToolbar>
        <UIButton title="Clear" clear onClick={handleOnClearEvent} />
        <UIButton title="Submit" submit onClick={handleOnSubmitEvent} />
      </UIToolbar>
    </UIFormContainer>
  );
};

export default UIShoppingListLine;
