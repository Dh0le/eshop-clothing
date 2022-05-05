import {
  ProductCardContainer,
  ProductCardImage,
  ProductName,
  ProductPrice,
  Footer,
} from "./product-card.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);
  const { name, price, imageUrl } = product;
  const addProductToCart = () => addItemToCart(product);
  return (
    <ProductCardContainer className="product-card-container">
      <ProductCardImage src={imageUrl} alt={`${name}`} />
      <Footer className="footer">
        <ProductName className="name">{name}</ProductName>
        <ProductPrice className="price">{price}</ProductPrice>
        <Button
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          onClick={addProductToCart}
        >
          Add to Cart
        </Button>
      </Footer>
    </ProductCardContainer>
  );
};
export default ProductCard;
