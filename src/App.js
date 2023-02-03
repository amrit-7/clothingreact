import Home from "./components/routes/home-route/home-route.component.jsx";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  createUserDocFromAuth,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";
import Navbar from "./components/routes/navbar/navbar.component.jsx";
import SignIn from "./components/routes/sign-in/sign-in.component.jsx";
import Shop from "./components/routes/shop/shop.component.jsx";
import CheckOut from "./components/routes/checkout/checkout.component.jsx";
import { useEffect } from "react";
import { setCurrentUser } from "./store/action/action.jsx";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/shop/*" element={<Shop />}></Route>
        <Route path="/checkout" element={<CheckOut />}></Route>
      </Route>
    </Routes>
  );
};
export default App;
