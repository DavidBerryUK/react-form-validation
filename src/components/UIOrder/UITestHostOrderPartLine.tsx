import { PartLineViewModel } from "./models/PartLineViewModel";
import React, { useState } from "react";
import UIOrderPartLine from "./UIOrderPartLine";

const UITestHostOrderPartLine: React.FC = () => {
  const [value, setValue] = useState<PartLineViewModel>(new PartLineViewModel());

  const handleOnFieldValueChangedEvent = (line: PartLineViewModel) => {
    setValue(line);
  };

  return <UIOrderPartLine value={value} onChange={handleOnFieldValueChangedEvent} />;
};

export default UITestHostOrderPartLine;
