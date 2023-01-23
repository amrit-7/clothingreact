import { Outlet } from "react-router-dom";
import CartIcon from "../../cart-icon/cart-icon.component";
import { Fragment, useContext } from "react";
import { ReactComponent as Logo } from "../../../assets/crown.svg";
import { UserContext } from "../../../contexts/userContext";
import { CartContext } from "../../../contexts/cart.context";
import "./navigation.styles.jsx";
import {
  NavbarComponent,
  NavBrandLink,
  NavLinksContainer,
  NavLink,
} from "./navigation.styles.jsx";
import { signOutUser } from "../../../utils/firebase/firebase.utils";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

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
          <NavLink to="/shop"> Shop </NavLink>
          {currentUser ? (
            <NavLink onClick={signOutHandler}>Sign Out</NavLink>
          ) : (
            <NavLink to="/signin">Sign In</NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </NavbarComponent>
      <Outlet />
    </Fragment>
  );
};
export default Navbar;
