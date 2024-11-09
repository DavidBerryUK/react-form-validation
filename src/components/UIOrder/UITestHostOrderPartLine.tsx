import { PartLineViewModel } from "./models/OrderViewModel";
import FieldModel from "../../library/packageViewModelp/base/FieldModel";
import React, { useState } from "react";
import UIField from "../UIField/UIField";
import UIFormContainer from "../UIField/UIFormContainer";

const UITestHostOrderPartLine: React.FC = () => {
  const [value, setValue] = useState<PartLineViewModel>(new PartLineViewModel());

  const handleOnFieldValueChangedEvent = (field: FieldModel) => {
    setValue(value.cloneWithField(field));
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

export default UITestHostOrderPartLine;
