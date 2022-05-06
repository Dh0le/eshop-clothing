import { useState } from "react";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import {
  SignInButtonContainer,
  SignInFormContainer,
} from "./sign-in-form.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";

const SignInForm = () => {
  // set a default form field
  const defaultFormFields = {
    email: "",
    password: "",
  };
  // set a use state hook for form field
  const [formFields, setFormField] = useState(defaultFormFields);
  const { email, password } = formFields;

  // set hook with context

  // helper function to reset form field
  const resetFormFields = () => {
    setFormField(defaultFormFields);
  };
  // a function to sign in with google popup
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  // a handle function for submit event of the form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      // once the user is signed in, we set user context using setcurrent user
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password or email");
          break;
        case "auth/user-not-found":
          alert(`No user associate with this email`);
          break;
        default:
          console.log(error);
          break;
      }
    }
  };
  // once user type in in the form field, we update our state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formFields, [name]: value });
  };

  return (
    <SignInFormContainer className="sign-in-form-container">
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
          minLength="6"
        />

        <SignInButtonContainer className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google Sign in
          </Button>
        </SignInButtonContainer>
      </form>
    </SignInFormContainer>
  );
};
export default SignInForm;
