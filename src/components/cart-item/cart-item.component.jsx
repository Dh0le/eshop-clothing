//import "./cart-item.styles.scss";
import {
  CartItemContainer,
  ItemDetail,
  CartItemImage,
} from "./cart-item-styles";
const CartItem = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <CartItemContainer>
      <CartItemImage src={imageUrl} alt={`${name}`} />
      <ItemDetail>
        <span>{name}</span>
        <span>
          {quantity} x {price}
        </span>
      </ItemDetail>
    </CartItemContainer>
  );
};
export default CartItem;
