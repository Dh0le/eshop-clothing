import { GoogleSignButton, InvertedButton, BaseButton } from "./button.styles";
// there will be three type of buttons, default, inverted, and google sign in.
export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton
      // we have dynamic class here for styling.
      {...otherProps}
    >
      {children}
    </CustomButton>
  );
};

export default Button;
