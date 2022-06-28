import {
  ProductCardContainer,
  ProductCardImage,
  ProductName,
  ProductPrice,
  Footer,
} from "./product-card.styles";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { addItemToCart } from "../../store/cart/cart.reducer";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { selectCartItems } from "../../store/cart/cart.selector";
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, price, imageUrl } = product;
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
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
