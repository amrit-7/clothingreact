import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartIsOpen } from "../../../store/cart/cart.selector";
import CartIcon from "../../cart-icon/cart-icon.component";
import { Fragment } from "react";
import { ReactComponent as Logo } from "../../../assets/crown.svg";
import "./navigation.styles.jsx";
import { selectCurrentUser } from "../../../store/selector/user.selector";
import {
  NavbarComponent,
  NavBrandLink,
  NavLinksContainer,
  NavLink,
} from "./navigation.styles.jsx";
import { signOutUser } from "../../../utils/firebase/firebase.utils";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";

const Navbar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectCartIsOpen);

  const signOutHandler = async () => {
    await signOutUser();
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
