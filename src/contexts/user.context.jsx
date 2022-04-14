import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChangeListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";
// as the actual value you want to access.
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  //  use a listener to monitor the auth status
  // this function should activate when this component mount
  useEffect(() => {
    const unsubsrible = onAuthStateChangeListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubsrible;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
