import { ReactNode } from "react";
import EnumFieldDataType from "../../library/packageViewModelp/enums/EnumFieldDataType";
import FieldModel from "../../library/packageViewModelp/base/FieldModel";
//
// helper component to show child functions if a condition is met
//
interface IProperties {
  value?: boolean | null | undefined;
  field?: FieldModel | null | undefined;
  children?: ReactNode;
}

const UIShowIfTrue: React.FC<IProperties> = ({ value, field, children }) => {
  var show = false;

  if (value === true) {
    show = true;
  }

  if (field?.dataType === EnumFieldDataType.boolean && field.valueAsBoolean === true) {
    show = true;
  }

  if (show === false) {
    return null;
  }

  return <>{children}</>;
};

export default UIShowIfTrue;
