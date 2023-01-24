import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { Button } from "react-bootstrap";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";
import { useNavigate } from "react-router";

const CartDropdown = () => {
  const navigate = useNavigate();

  const checkout = (e) => {
    e.preventDefault();
    navigate("/checkout");
  };
  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button className="cart-btn" onClick={checkout}>
        Checkout
      </Button>
    </div>
  );
};

export default CartDropdown;
