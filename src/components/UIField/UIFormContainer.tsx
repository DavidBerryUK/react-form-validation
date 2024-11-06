import IPropChildren from "../../properties/IPropChildren";
import IPropTitle from "../../properties/IPropTitle";

type IProperties = IPropChildren & IPropTitle;

/**
 * Common Text Field
 * @param props
 * @returns
 */
const UIFormContainer: React.FC<IProperties> = (props) => {
  return (
    <div className="ui-form-container">
      <h2>{props.title}</h2>
      {props.children}
    </div>
  );
};

export default UIFormContainer;
