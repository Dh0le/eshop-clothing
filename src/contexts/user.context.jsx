import { createContext, useEffect, useReducer } from "react";
import {
  onAuthStateChangeListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

import { createAction } from "../utils/reducer/reducer.utils";
// as the actual value you want to access.
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};
const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };

    default:
      throw new Error(`Unhanled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};
export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };
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
