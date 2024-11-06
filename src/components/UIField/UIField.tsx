import EnumFieldDataType from "../../library/packageViewModelp/enums/EnumFieldDataType";
import FieldModel from "../../library/packageViewModelp/base/FieldModel";
import IPropDisabled from "../../properties/IPropDisabled";
import IPropOnChange from "../../properties/IPropOnChange";
import IPropPlaceholder from "../../properties/IPropPlaceholder";
import IPropValue from "../../properties/IPropValue";
import React from "react";
import UILabel from "./UILabel";
import UIShowIfTrue from "../UIShowIfTrue/UIShowIfTrue";

type IProperties = IPropDisabled & IPropPlaceholder & IPropValue<FieldModel> & IPropOnChange<FieldModel>;

/**
 * Common Text Field
 * @param props
 * @returns
 */
const UIField: React.FC<IProperties> = (props) => {
  const handleOnChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      if (props.value.dataType === EnumFieldDataType.boolean) {
        props.onChange(props.value.cloneWithValue(event.target.checked));
      } else {
        props.onChange(props.value.cloneWithValue(event.target.value));
      }
    }
  };

  if (!props.value.active) {
    return null;
  }

  const showHelpMessage = !!props.value.help?.length;
  const showErrorMessage = !!props.value.error.length;

  const inputStyle = `field-text ${showErrorMessage ? "error" : ""}`;

  let inputType: "text" | "number" | "checkbox" | "date" = "text";

  switch (props.value.dataType) {
    case EnumFieldDataType.boolean:
      inputType = "checkbox";
      break;
    case EnumFieldDataType.string:
      inputType = "text";
      break;
    case EnumFieldDataType.number:
      inputType = "number";
      break;
    case EnumFieldDataType.date:
      inputType = "date";
      break;
  }

  return (
    <div className="ui-field">
      <UILabel value={props.value} />
      <input
        type={inputType}
        id={props.value.fieldName}
        value={props.value.value as string}
        disabled={props.disabled}
        className={inputStyle}
        placeholder={props.placeholder}
        onChange={handleOnChangeEvent}
        autoComplete="off"
      />
      <UIShowIfTrue value={showHelpMessage}>
        <div className="label-help">{props.value.help}</div>
      </UIShowIfTrue>
      <UIShowIfTrue value={showErrorMessage}>
        <div className="label-error">{props.value.error}</div>
      </UIShowIfTrue>
    </div>
  );
};

export default UIField;
