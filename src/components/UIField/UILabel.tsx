import FieldModel from "../../library/packageViewModelp/base/FieldModel";
import IPropValue from "../../properties/IPropValue";

type IProperties = IPropValue<FieldModel>;

/**
 * Common Text Field
 * @param props
 * @returns
 */
const UILabel: React.FC<IProperties> = (props) => {
  return (
    <label htmlFor={props.value.fieldName} aria-label={props.value.caption} className="ui-label">
      {props.value.caption}
    </label>
  );
};

export default UILabel;
