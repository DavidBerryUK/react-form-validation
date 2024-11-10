import { LabourLineViewModel } from "../models/LabourLineViewModel";
import OrderViewModel from "../models/OrderViewModel";
import React from "react";
import UIButton from "../../UIButton/UIButton";
import UIOrderLabourLine from "./UIOrderLabourLine";

interface IProperties {
  value: OrderViewModel;
  onChange: (form: OrderViewModel) => void;
}

/**
 * Display a collection of labour lines
 */
const UIOrderLabourLineCollection: React.FC<IProperties> = ({ value, onChange }) => {
  /****************************************************/
  /* Event Handlers                                   */
  /****************************************************/

  /**
   * a labour line has been updated, update the OrderViewModel
   * with the update labour line, then raise event to the Order Component
   */
  const handleOnLabourLineChange = (labourLine: LabourLineViewModel) => {
    const model = value.updateLabourLine(labourLine);
    onChange(model);
  };

  /**
   * request to add a new labour line, raise event to the parent order controller
   * to add a new order line.
   */
  const handleAddLabourLine = () => {
    onChange(value.addLabourLine());
  };

  /**
   * Request from a labour line to delete itself.
   * Update the view model and raise event to the parent with the updated
   * Order View Model
   */
  const handleOnDeleteLabourLine = (labourLine: LabourLineViewModel) => {
    onChange(value.deleteLabourLine(labourLine));
  };

  /****************************************************/
  /* Template                                         */
  /****************************************************/
  return (
    <div className="ui-labour-lines-container">
      <UIButton title="Add Labour Line" clear onClick={handleAddLabourLine} />
      {value.labourLines.map((line) => (
        <UIOrderLabourLine key={line.key} value={line} onChange={handleOnLabourLineChange} onDelete={handleOnDeleteLabourLine} />
      ))}
    </div>
  );
};

export default UIOrderLabourLineCollection;
