import FieldModel from "../../viewModels/base/FieldModel";
import IPropDisabled from "../../properties/IPropDisabled";
import IPropOnChange from "../../properties/IPropOnChange";
import IPropPlaceholder from "../../properties/IPropPlaceholder";
import IPropValue from "../../properties/IPropValue";
import React from "react";
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
      const newFieldValue = props.value.cloneWithValue(event.target.value);
      props.onChange(newFieldValue);
    }
  };

  const inputStyle = `field-text`;

  const showHelpMessage = !!props.value.help?.length;
  const showErrorMessage = !!props.value.error?.length;

  return (
    <div className="ui-field">
      <label htmlFor="first_name" aria-label={props.value.caption} className="field-label">
        {props.value.caption}
      </label>
      <input
        type={props.value.inputType}
        id="first_name"
        value={props.value.value as string}
        disabled={props.disabled}
        className={inputStyle}
        placeholder={props.placeholder}
        onChange={handleOnChangeEvent}
        autoComplete="off"
      />
      <UIShowIfTrue value={showHelpMessage}>
        <p className="text-muted-foreground text-sm">{props.value.help}</p>
      </UIShowIfTrue>
      <UIShowIfTrue value={showErrorMessage}>
        <p className="text-sm text-red-600">{props.value.error}</p>
      </UIShowIfTrue>
    </div>
  );
};

export default UIField;
