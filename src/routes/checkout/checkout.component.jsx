import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles";
import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
const CheckOut = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((cartItem) => {
        return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
      })}
      <Total className="total">Total:${cartTotal}</Total>
    </CheckoutContainer>
  );
};
export default CheckOut;
