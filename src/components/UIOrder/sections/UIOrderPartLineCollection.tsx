import { LabourLineViewModel } from "../models/LabourLineViewModel";
import { PartLineViewModel } from "../models/PartLineViewModel";
import React from "react";
import UIOrderPartLine from "./UIOrderPartLine";

interface IProperties {
  value: LabourLineViewModel;
  onChange: (form: LabourLineViewModel) => void;
}

/**
 * Display a collection of part lines
 */
const UIOrderPartLineCollection: React.FC<IProperties> = ({ value, onChange }) => {
  /****************************************************/
  /* Event Handlers                                   */
  /****************************************************/

  /**
   * a part line from the collection has been updated, raise an event
   * to the parent (order) to update the order view model
   */
  const handleOnPartLineChangeEvent = (partLine: PartLineViewModel) => {
    const model = value.updatePartLine(partLine);
    onChange(model);
  };

  /**
   * handles a request to delete a part line. this
   * deletes the part from the labourlines part collection then
   * raises and event to the parent to update the order view model
   */
  const handleDeleteLineEvent = (partLine: PartLineViewModel) => {
    const model = value.deletePartLine(partLine);
    onChange(model);
  };

  /****************************************************/
  /* Template                                         */
  /****************************************************/
  return (
    <div className="ui-order-part-line-collection">
      {value.partLines.map((line) => (
        <UIOrderPartLine key={line.key} value={line} onChange={handleOnPartLineChangeEvent} onDelete={handleDeleteLineEvent} />
      ))}
    </div>
  );
};

export default UIOrderPartLineCollection;
