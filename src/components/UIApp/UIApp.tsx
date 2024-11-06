// import { ContactFormViewModel } from "../../viewModels/ContactFormViewModel";
import { RsvpFormViewModel } from "../../viewModels/RsvpFormViewModel";
import React, { useState } from "react";
// import UIFormContactWidget from "../UIFormContactWidget/UIFormContactWidget";
import UIFormRsvpWidget from "../UIFormRsvpWidget/UIFormRsvpWidget";

const UIApp: React.FC = () => {
  // const [contactForm, setContactForm] = useState<ContactFormViewModel>(ContactFormViewModel.CreateEmptyViewModel());
  const [rsvpForm, setRsvpForm] = useState<RsvpFormViewModel>(RsvpFormViewModel.CreateEmptyViewModel());

  // const handleOnContactFormChangeEvent = (value: ContactFormViewModel) => {
  //   setContactForm(value);
  // };

  const handleOnRsvpFormChangeEvent = (value: RsvpFormViewModel) => {
    setRsvpForm(value);
  };

  return (
    <div>
      {/* <UIFormContactWidget value={contactForm} onChange={handleOnContactFormChangeEvent} /> */}
      <UIFormRsvpWidget value={rsvpForm} onChange={handleOnRsvpFormChangeEvent} />
    </div>
  );
};

export default UIApp;
