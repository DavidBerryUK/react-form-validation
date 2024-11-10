import { LabourLineViewModel } from "../models/LabourLineViewModel";
import FieldModel from "../../../library/packageViewModelp/base/FieldModel";
import React from "react";
import UIButton from "../../UIButton/UIButton";
import UIField from "../../UIField/UIField";
import UIOrderPartLineCollection from "./UIOrderPartLineCollection";

interface IProperties {
  value: LabourLineViewModel;
  onChange: (value: LabourLineViewModel) => void;
  onDelete: (value: LabourLineViewModel) => void;
}

/**
 * Display a single labour line, this will also display a collection
 * of child part lines
 */
const UIOrderLabourLine: React.FC<IProperties> = ({ value, onChange, onDelete }) => {
  /****************************************************/
  /* Event Handlers                                   */
  /****************************************************/

  /**
   * a field has been updated on this Labour line. this updated the
   * labour line view model and raises event to update the order model
   */
  const handleOnFieldValueChangedEvent = (field: FieldModel) => {
    onChange(value.cloneWithField(field));
  };

  /**
   * add a new part line. This adds the part line to the view model
   * and raises event to parent to update the order model
   */
  const handleAddPartLineEvent = () => {
    const model = value.addPartLine();
    onChange(model);
  };

  /**
   * update part line, the updated part line is return in the labour line parameter
   * and raises an event to the parent with the updated labourLine to update
   * the order model
   */
  const handlePartLineUpdatedEvent = (labourLine: LabourLineViewModel) => {
    onChange(labourLine);
  };

  /**
   * Delete this labour line by raising event to parent
   */
  const handleDeleteLineEvent = () => {
    onDelete(value);
  };

  /****************************************************/
  /* Template                                         */
  /****************************************************/
  return (
    <div className="ui-labour-line">
      <div className="field-container">
        <h3>Labour Line</h3>
        <div>parts:{value.partLines.count()}</div>
        <UIField value={value.description} onChange={handleOnFieldValueChangedEvent} />
        <UIField value={value.labourRate} onChange={handleOnFieldValueChangedEvent} />
        <UIField value={value.hours} onChange={handleOnFieldValueChangedEvent} />
        <UIField value={value.labourTotal} onChange={handleOnFieldValueChangedEvent} />
        <UIField value={value.partsTotal} onChange={handleOnFieldValueChangedEvent} />
        <UIField value={value.lineTotal} onChange={handleOnFieldValueChangedEvent} />
        <UIButton title="Add Part Line" clear onClick={handleAddPartLineEvent} />
        <UIButton title="Delete" clear onClick={handleDeleteLineEvent} />
      </div>
      <UIOrderPartLineCollection value={value} onChange={handlePartLineUpdatedEvent} />
    </div>
  );
};

export default UIOrderLabourLine;
