import IPropChildren from "../../properties/IPropChildren";
import IPropClassName from "../../properties/IPropClassName";
import IPropTitle from "../../properties/IPropTitle";

type IProperties = IPropChildren & IPropTitle & IPropClassName;

/**
 * Common Text Field
 * @param props
 * @returns
 */
const UIFormContainer: React.FC<IProperties> = (props) => {
  const className = `ui-form-container ${props.className}`;
  return (
    <div className={className}>
      <h2>{props.title}</h2>
      {props.children}
    </div>
  );
};

export default UIFormContainer;
