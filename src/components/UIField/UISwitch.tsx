import React from "react";
import IPropDisabled from "../../properties/IPropDisabled";
import IPropValue from "../../properties/IPropValue";
import FieldModel from "../../library/packageViewModelp/base/FieldModel";
import IPropOnChange from "../../properties/IPropOnChange";

type IProperties = IPropDisabled & IPropValue<FieldModel> & IPropOnChange<FieldModel>;

const UISwitch: React.FC<IProperties> = (props) => {
  const handleOnChangeEvent = () => {
    if (props.onChange) {
      props.onChange(props.value.cloneWithValue(!props.value.valueAsBoolean));
    }
  };

  const handleOnClickEvent = (event: React.MouseEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(props.value.cloneWithValue(!props.value.valueAsBoolean));
    }
  };

  return (
    <div className="ui-switch">
      <label className="field-label">
        {props.value.caption}
        <input type="checkbox" checked={props.value.valueAsBoolean} onClick={handleOnClickEvent} onChange={handleOnChangeEvent} />
        <span className="ui-switch-slider"></span>
      </label>
    </div>
  );
};

export default UISwitch;
