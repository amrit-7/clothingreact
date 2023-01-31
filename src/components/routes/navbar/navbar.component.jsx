import { Outlet } from "react-router-dom";
import CartIcon from "../../cart-icon/cart-icon.component";
import { Fragment, useContext } from "react";
import { ReactComponent as Logo } from "../../../assets/crown.svg";
import { CartContext } from "../../../contexts/cart.context";
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
import { useSelector } from "react-redux";

const Navbar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { isCartOpen } = useContext(CartContext);

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
