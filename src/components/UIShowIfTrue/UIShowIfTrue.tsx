import { ReactNode } from "react";
import FieldModel from "../../library/packageViewModelp/base/FieldModel";
import EnumFieldDataType from "../../library/packageViewModelp/enums/EnumFieldDataType";

interface IProperties {
  value?: boolean | FieldModel | null;
  children?: ReactNode;
}

const UIShowIfTrue: React.FC<IProperties> = ({ value, children }) => {
  const show = value === true || (value instanceof FieldModel && value.dataType === EnumFieldDataType.boolean && value.valueAsBoolean === true);

  if (!show) {
    return null;
  }

  return <>{children}</>;
};

export default UIShowIfTrue;
