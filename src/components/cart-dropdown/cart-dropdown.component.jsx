import { Button } from "react-bootstrap";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items" />
      <Button className="cart-btn">Checkout</Button>
    </div>
  );
};

export default CartDropdown;
