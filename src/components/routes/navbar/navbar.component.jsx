import { Outlet } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as Logo } from "../../../assets/crown.svg";
import { UserContext } from "../../../contexts/userContext";
import "./navigation.styles.jsx";
import {
  NavbarComponent,
  NavBrandLink,
  NavLinksContainer,
  NavLink,
} from "./navigation.styles.jsx";
import { signOutUser } from "../../../utils/firebase/firebase.utils";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log(currentUser);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };
  return (
    <Fragment>
      <NavbarComponent>
        <NavBrandLink to="/">
          <Logo />
        </NavBrandLink>
        <NavLinksContainer>
          {currentUser ? (
            <NavLink onClick={signOutHandler}>Sign Out</NavLink>
          ) : (
            <NavLink to="/signin">Sign In</NavLink>
          )}
        </NavLinksContainer>
      </NavbarComponent>
      <Outlet />
    </Fragment>
  );
};
export default Navbar;
