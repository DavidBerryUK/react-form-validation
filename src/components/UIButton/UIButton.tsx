import IPropOnClick from "../../properties/IPropOnClick";
import IPropTitle from "../../properties/IPropTitle";

type IProperties = IPropOnClick &
  IPropTitle & {
    submit?: boolean;
    clear?: boolean;
  };

/**
 * Common Text Field
 * @param props
 * @returns
 */
const UIButton: React.FC<IProperties> = (props) => {
  const className = `ui-button ${props.clear ? "clear " : ""} ${props.submit ? "submit" : ""}`;

  const handleOnClickEvent = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button className={className} onClick={handleOnClickEvent}>
      {props.title}
    </button>
  );
};

export default UIButton;
