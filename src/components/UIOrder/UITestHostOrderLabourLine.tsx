import { LabourLineViewModel } from "./models/OrderViewModel";
import React, { useState } from "react";
import UIOrderLabourLine from "./UIOrderLabourLine";

const UITestHostOrderLabourLine: React.FC = () => {
  const [value, setValue] = useState<LabourLineViewModel>(new LabourLineViewModel());

  const handleOnFieldValueChangedEvent = (line: LabourLineViewModel) => {
    setValue(line);
  };

  return <UIOrderLabourLine value={value} onChange={handleOnFieldValueChangedEvent} />;
};

export default UITestHostOrderLabourLine;
