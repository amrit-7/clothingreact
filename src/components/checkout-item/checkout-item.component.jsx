import "./checkout-item.styles.scss";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
const CheckoutItem = ({ cartItem }) => {
  const { deleteItemToCart, addItemToCart, removeItemToCart } =
    useContext(CartContext);
  const { name, imageUrl, price, quantity } = cartItem;
  const deleteItem = () => deleteItemToCart(cartItem);
  const addItem = () => addItemToCart(cartItem);
  const removeItem = () => removeItemToCart(cartItem);

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
