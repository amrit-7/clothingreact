import "./button.styles.scss";
const BUTTON_TYPE = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, buttonType, ...otherprops }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE[buttonType]}`}
      {...otherprops}
    ></button>
  );
};
export default Button;
