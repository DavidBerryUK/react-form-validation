import { PartLineViewModel } from "../models/PartLineViewModel";
import FieldModel from "../../../library/packageViewModelp/base/FieldModel";
import React from "react";
import UIButton from "../../UIButton/UIButton";
import UIField from "../../UIField/UIField";

interface IProperties {
  value: PartLineViewModel;
  onChange: (form: PartLineViewModel) => void;
  onDelete: (value: PartLineViewModel) => void;
}

/**
 * Display a single part line
 */
const UIOrderPartLine: React.FC<IProperties> = ({ value, onChange, onDelete }) => {
  /****************************************************/
  /* Event Handlers                                   */
  /****************************************************/

  /**
   * a UIField has been updated, this updated the PartLine and
   * raises an event to the parent to update the order line, and then
   * the order object.
   */
  const handleOnFieldValueChangedEvent = (field: FieldModel) => {
    onChange(value.cloneWithField(field));
  };

  /**
   * Delete this line by raising an event to the parent (Labour Line) to
   * request to remove it from the parts collection
   */
  const handleDeleteLineEvent = () => {
    onDelete(value);
  };

  /****************************************************/
  /* Template                                         */
  /****************************************************/
  return (
    <div className="ui-part-line">
      <UIField value={value.code} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.description} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.price} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.quantity} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.discountPercentage} onChange={handleOnFieldValueChangedEvent} />
      <UIField value={value.lineTotal} onChange={handleOnFieldValueChangedEvent} />
      <UIButton title="Delete" clear onClick={handleDeleteLineEvent} />
    </div>
  );
};

export default UIOrderPartLine;
