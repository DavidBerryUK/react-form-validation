import IPropChildren from "../../properties/IPropChildren";

type IProperties = IPropChildren;

/**
 * Common Text Field
 * @param props
 * @returns
 */
const UIToolbar: React.FC<IProperties> = (props) => {
  return <div className="ui-toolbar">{props.children}</div>;
};

export default UIToolbar;
