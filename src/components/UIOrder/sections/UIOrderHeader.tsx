import FieldModel from "../../../library/packageViewModelp/base/FieldModel";
import OrderViewModel from "../models/OrderViewModel";
import React from "react";
import UIField from "../../UIField/UIField";

interface IProperties {
  value: OrderViewModel;
  onChange: (form: OrderViewModel) => void;
}

const UIOrderHeader: React.FC<IProperties> = ({ value, onChange }) => {
  const handleOnFieldValueChangedEvent = (field: FieldModel) => {
    onChange(value.cloneWithField(field));
  };

  return (
    <div className="ui-order-header-widget">
      <h3>Order Header</h3>
      <div>labour lines:{value.labourLines.count()}</div>
      <div className="field-container">
        <UIField value={value.customer} onChange={handleOnFieldValueChangedEvent} />
        <UIField value={value.supplier} onChange={handleOnFieldValueChangedEvent} />
        <UIField value={value.partsTotal} onChange={handleOnFieldValueChangedEvent} />
        <UIField value={value.labourTotal} onChange={handleOnFieldValueChangedEvent} />
        <UIField value={value.orderTotal} onChange={handleOnFieldValueChangedEvent} />
      </div>
    </div>
  );
};

export default UIOrderHeader;
