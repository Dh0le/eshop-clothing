import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication";
import Shop from "./routes/shop/shop.component";
import { useEffect } from "react";
import CheckOut from "./routes/checkout/checkout.component";
import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";
import {
  onAuthStateChangeListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";

const App = () => {
  // acquire dispatch useing hook from redux
  const dispatch = useDispatch();
  // subscrible to authstate and dispatch it into state
  useEffect(() => {
    const unsubsrible = onAuthStateChangeListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      console.log(user);
      dispatch(setCurrentUser(user));
    });
    return unsubsrible;
  }, [dispatch]);
  // dispatch does not change, adding it into observation is just for linting problem
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/shop/*" element={<Shop />} />
        <Route path="/checkout" element={<CheckOut />} />
      </Route>
    </Routes>
  );
};

export default App;
