import { ReactNode } from "react";
//
// helper component to show child functions if a condition is met
//
interface IProperties {
  value?: boolean | null;
  children?: ReactNode;
}

const UIShowIfTrue: React.FC<IProperties> = ({ value, children }) => {
  //
  // if the isTrue property is provided, then evaluate if
  //
  if (!value) {
    return null;
  }

  return <>{children}</>;
};

export default UIShowIfTrue;
