import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
import { signOutStart } from "../../../store/action/action";
import CartDropdown from "../../cart-dropdown/cart-dropdown.component";

const Navbar = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectCartIsOpen);
  const dispatch = useDispatch();

  const signOutHandler = () => dispatch(signOutStart());
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
