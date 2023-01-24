import { useContext } from "react";
import { Button } from "react-bootstrap";
import { CartContext } from "../../contexts/cart.context";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const productToAdd = () => addItemToCart(product);
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button className="addToCart" onClick={productToAdd}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
