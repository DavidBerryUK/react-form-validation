// import { ContactFormViewModel } from "../../viewModels/ContactFormViewModel";
// import { RsvpFormViewModel } from "../../viewModels/RsvpFormViewModel";
// import { ShoppingListLineViewModel } from "../../viewModels/ShoppingListLineViewModel";
import React, { useState } from "react";
// import UIFormContactWidget from "../UIFormContactWidget/UIFormContactWidget";
// import UIFormRsvpWidget from "../UIFormRsvpWidget/UIFormRsvpWidget";
// import UIShoppingListLineWidget from "../UIShoppingListLineWidget/UIShoppingListLineWidget";

import OrderViewModel from "../UIOrder/models/OrderViewModel";

import UIOrderWidget from "../UIOrder/UIOrderWidget";

const UIApp: React.FC = () => {
  const [order, setOrder] = useState<OrderViewModel>(new OrderViewModel());

  // const [contactForm, setContactForm] = useState<ContactFormViewModel>(ContactFormViewModel.CreateEmptyViewModel());
  // const [rsvpForm, setRsvpForm] = useState<RsvpFormViewModel>(RsvpFormViewModel.CreateEmptyViewModel());
  // const [shoppingListLine, setShoppingListLine] = useState<ShoppingListLineViewModel>(ShoppingListLineViewModel.CreateEmptyViewModel());

  // const handleOnShoppingListLineChangeEvent = (value: ShoppingListLineViewModel) => {
  //   setShoppingListLine(value);
  // };

  // const handleOnContactFormChangeEvent = (value: ContactFormViewModel) => {
  //   setContactForm(value);
  // };

  // const handleOnRsvpFormChangeEvent = (value: RsvpFormViewModel) => {
  //   setRsvpForm(value);
  // };

  const handleOnOrderChangeEvent = (value: OrderViewModel) => {
    setOrder(value);
  };

  return (
    <div className="ui-app-list">
      {/* <UIFormContactWidget value={contactForm} onChange={handleOnContactFormChangeEvent} />
      <UIFormRsvpWidget value={rsvpForm} onChange={handleOnRsvpFormChangeEvent} />
      <UIShoppingListLineWidget value={shoppingListLine} onChange={handleOnShoppingListLineChangeEvent} /> */}
      <UIOrderWidget value={order} onChange={handleOnOrderChangeEvent} />
    </div>
  );
};

export default UIApp;
