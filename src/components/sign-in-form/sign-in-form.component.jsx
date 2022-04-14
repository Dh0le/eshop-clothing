import { useState, useContext } from "react";
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import { UserContext } from "../../contexts/user.context";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.style.scss";

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
  const { setCurrentUser } = useContext(UserContext);

  // helper function to reset form field
  const resetFormFields = () => {
    setFormField(defaultFormFields);
  };
  // a function to sign in with google popup
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
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
      setCurrentUser(user);
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
    <div className="sign-in-form-container">
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

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
