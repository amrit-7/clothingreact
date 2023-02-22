import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router";
import {
  CartDropdownContainer,
  Cartitem,
  EmptyMessage,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const navigate = useNavigate();

  const checkout = (e) => {
    e.preventDefault();
    navigate("/checkout");
  };
  const cartItems = useSelector(selectCartItems);
  return (
    <CartDropdownContainer>
      <Cartitem>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </Cartitem>
      <Button className="cart-btn" onClick={checkout}>
        Checkout
      </Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
