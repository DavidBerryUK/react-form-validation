import React from "react";
import OrderViewModel from "./models/OrderViewModel";
import UIOrderLabourLineCollection from "./sections/UIOrderLabourLineCollection";
import UIOrderHeader from "./sections/UIOrderHeader";

interface IProperties {
  value: OrderViewModel;
  onChange: (order: OrderViewModel) => void;
}

/**
 * Display an Order
 */
const UIOrderWidget: React.FC<IProperties> = ({ value, onChange }) => {
  /****************************************************/
  /* Event Handlers                                   */
  /****************************************************/

  /**
   * The order has been updated by either the header or
   * labour lines (or its children). Raise an event to parent container
   * to update the order state
   */
  const handleOnOrderChangeEvent = (order: OrderViewModel) => {
    onChange(order);
  };

  /****************************************************/
  /* Template                                         */
  /****************************************************/
  return (
    <div className="ui-order-widget">
      <h1>order widget </h1>
      <UIOrderHeader value={value} onChange={handleOnOrderChangeEvent} />
      <UIOrderLabourLineCollection value={value} onChange={handleOnOrderChangeEvent} />
    </div>
  );
};

export default UIOrderWidget;
