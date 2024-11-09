import OrderViewModel from "./models/OrderViewModel";
import React, { useState } from "react";
import UIOrderLines from "./UIOrderLines";

const UITestHostOrderLines: React.FC = () => {
  const [value, setValue] = useState<OrderViewModel>(new OrderViewModel());

  const handleOnFieldValueChangedEvent = (line: OrderViewModel) => {
    setValue(line);
  };

  return <UIOrderLines value={value} onChange={handleOnFieldValueChangedEvent} />;
};

export default UITestHostOrderLines;
