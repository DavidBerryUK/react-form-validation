import React, { useState } from "react";
import UIContactFormWidget from "../UIContactFormWidget/UIContactFormWidget";
import { ContactFormViewModel } from "../../viewModels/ContactFormViewModel";

const UIApp: React.FC = () => {
  const [form, setForm] = useState<ContactFormViewModel>(ContactFormViewModel.CreateEmptyViewModel());

  const handleOnFormOnChangeEvent = (value: ContactFormViewModel) => {
    setForm(value);
  };

  return (
    <div className="App">
      <UIContactFormWidget value={form} onChange={handleOnFormOnChangeEvent} />
    </div>
  );
};

export default UIApp;
