import "./checkout-item.styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
  deleteItemToCart,
  addItemToCart,
  removeItemToCart,
} from "../../store/cart/cart.action";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
const CheckoutItem = ({ cartItem }) => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const { name, imageUrl, price, quantity } = cartItem;
  const deleteItem = () => dispatch(deleteItemToCart(cartItems, cartItem));
  const addItem = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItem = () => dispatch(removeItemToCart(cartItems, cartItem));

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name"> {name} </span>
      <span className="quantity">
        <div className="arrow" onClick={removeItem}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItem}>
          &#10095;
        </div>
      </span>
      <span className="price"> {price} </span>
      <div className="remove-button" onClick={deleteItem}>
        <DeleteIcon />
      </div>
    </div>
  );
};

export default CheckoutItem;
