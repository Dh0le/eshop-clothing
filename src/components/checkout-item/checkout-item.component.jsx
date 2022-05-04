import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";
import {
  CheckoutItemArrow,
  CheckOutItemImageContainer,
  CheckoutItemImage,
  CheckoutPrice,
  CheckoutValue,
  RemoveButton,
  CheckoutItemContainer,
  CheckoutQuantity,
  CheckoutItemName,
} from "./checkout-item.styles";
const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { addItemToCart, decreaseItemFromCart, removeItemFromCart } =
    useContext(CartContext);

  const clearItemHandler = () => removeItemFromCart(cartItem);
  const decreaseItemHandler = () => decreaseItemFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  return (
    <CheckoutItemContainer>
      <CheckOutItemImageContainer>
        <CheckoutItemImage src={imageUrl} alt={`${name}`} />
      </CheckOutItemImageContainer>
      <CheckoutItemName>{name}</CheckoutItemName>
      <CheckoutQuantity>
        <CheckoutItemArrow onClick={decreaseItemHandler}>
          &#10094;
        </CheckoutItemArrow>
        <CheckoutValue>{quantity}</CheckoutValue>
        <CheckoutItemArrow onClick={addItemHandler}>&#10095;</CheckoutItemArrow>
      </CheckoutQuantity>
      <CheckoutPrice>{price}</CheckoutPrice>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
