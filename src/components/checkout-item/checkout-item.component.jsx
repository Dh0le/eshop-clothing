import {
  addItemToCart,
  decreaseItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cart.reducer";
import { useDispatch, useSelector } from "react-redux/es/exports";
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
import { selectCartItems } from "../../store/cart/cart.selector";
const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const clearItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));
  const decreaseItemHandler = () =>
    dispatch(decreaseItemFromCart(cartItems, cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
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
