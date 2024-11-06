import React from "react";
import IPropDisabled from "../../properties/IPropDisabled";
import IPropValue from "../../properties/IPropValue";
import FieldModel from "../../library/packageViewModelp/base/FieldModel";
import IPropOnChange from "../../properties/IPropOnChange";
import UILabel from "./UILabel";

type IProperties = IPropDisabled & IPropValue<FieldModel> & IPropOnChange<FieldModel>;

const UISwitch: React.FC<IProperties> = (props) => {
  const handleOnChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      event.stopPropagation();
      props.onChange(props.value.cloneWithValue(!props.value.valueAsBoolean));
    }
  };

  const handleOnClickEvent = (event: React.MouseEvent<HTMLInputElement>) => {
    if (props.onChange) {
      event.stopPropagation();
      props.onChange(props.value.cloneWithValue(!props.value.valueAsBoolean));
    }
  };

  if (!props.value.active) {
    return null;
  }

  return (
    <div className="ui-switch-control">
      <UILabel value={props.value} />
      <div className="ui-switch" onClick={handleOnClickEvent}>
        <input id={props.value.fieldName} type="checkbox" checked={props.value.valueAsBoolean} onClick={handleOnClickEvent} onChange={handleOnChangeEvent} />
        <span className="ui-switch-slider"></span>
      </div>
    </div>
  );
};

export default UISwitch;
