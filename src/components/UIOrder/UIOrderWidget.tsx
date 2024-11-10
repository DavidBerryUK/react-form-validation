import React from "react";
import OrderViewModel from "./models/OrderViewModel";
import UIOrderLabourLineCollection from "./sections/UIOrderLabourLineCollection";
import UIOrderHeader from "./sections/UIOrderHeader";

interface IProperties {
  value: OrderViewModel;
  onChange: (order: OrderViewModel) => void;
}

const UIOrderWidget: React.FC<IProperties> = ({ value, onChange }) => {
  const handleOnOrderChangeEvent = (order: OrderViewModel) => {
    onChange(order);
  };

  return (
    <div className="ui-order-widget">
      <h1>order widget </h1>
      <UIOrderHeader value={value} onChange={handleOnOrderChangeEvent} />
      <UIOrderLabourLineCollection value={value} onChange={handleOnOrderChangeEvent} />
    </div>
  );
};

export default UIOrderWidget;
