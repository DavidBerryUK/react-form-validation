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

const UIShoppingListLineWidget: React.FC<IProperties> = ({ value, onChange }) => {
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
    <div className="ui-shopping-list-app">
      <UIFormContainer title="Shopping List Single Line">
        <div className="ui-shopping-line">
          <UIField className="product" value={value.product} onChange={handleOnFieldValueChangedEvent} />
          <UIField className="price" value={value.price} onChange={handleOnFieldValueChangedEvent} />
          <UIField className="quantity" value={value.quantity} onChange={handleOnFieldValueChangedEvent} />
          <UIField className="total" value={value.total} onChange={handleOnFieldValueChangedEvent} />
        </div>
        <UIToolbar>
          <UIButton title="Clear" clear onClick={handleOnClearEvent} />
          <UIButton title="Submit" submit onClick={handleOnSubmitEvent} />
        </UIToolbar>
      </UIFormContainer>
    </div>
  );
};

export default UIShoppingListLineWidget;
