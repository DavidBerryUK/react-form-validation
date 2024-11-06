import { ContactFormViewModel } from "../../viewModels/ContactFormViewModel";
import { RsvpFormViewModel } from "../../viewModels/RsvpFormViewModel";
import { ShoppingListLineViewModel } from "../../viewModels/ShoppingListLineViewModel";
import React, { useState } from "react";
import UIFormContactWidget from "../UIFormContactWidget/UIFormContactWidget";
import UIFormRsvpWidget from "../UIFormRsvpWidget/UIFormRsvpWidget";
import UIShoppingListLine from "../UIShoppingListWidget/UIShoppingListLine";

const UIApp: React.FC = () => {
  const [contactForm, setContactForm] = useState<ContactFormViewModel>(ContactFormViewModel.CreateEmptyViewModel());
  const [rsvpForm, setRsvpForm] = useState<RsvpFormViewModel>(RsvpFormViewModel.CreateEmptyViewModel());
  const [shoppingListLine, setShoppingListLine] = useState<ShoppingListLineViewModel>(ShoppingListLineViewModel.CreateEmptyViewModel());

  const handleOnShoppingListLineChangeEvent = (value: ShoppingListLineViewModel) => {
    setShoppingListLine(value);
  };

  const handleOnContactFormChangeEvent = (value: ContactFormViewModel) => {
    setContactForm(value);
  };

  const handleOnRsvpFormChangeEvent = (value: RsvpFormViewModel) => {
    setRsvpForm(value);
  };

  return (
    <div className="ui-app-list">
      <UIFormContactWidget value={contactForm} onChange={handleOnContactFormChangeEvent} />
      <UIFormRsvpWidget value={rsvpForm} onChange={handleOnRsvpFormChangeEvent} />
      <UIShoppingListLine value={shoppingListLine} onChange={handleOnShoppingListLineChangeEvent} />
    </div>
  );
};

export default UIApp;
