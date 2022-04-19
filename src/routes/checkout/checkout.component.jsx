import "./checkout.styles.scss";
import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";
const CheckOut = () => {
  const { cartItems, addItemToCart, decreaseItemFromCart, removeItemFromCart } =
    useContext(CartContext);
  return (
    <div>
      {cartItems.map((cartItem) => {
        const { name, quantity, id } = cartItem;
        return (
          <div key={id}>
            <h2>{name}</h2>
            <span>{quantity}</span>
            <br />
            <span onClick={() => addItemToCart(cartItem)}>increment</span>
            <br />
            <span onClick={() => decreaseItemFromCart(cartItem)}>
              decrement
            </span>
            <br />
            <span onClick={() => removeItemFromCart(cartItem)}>remove</span>
          </div>
        );
      })}
    </div>
  );
};
export default CheckOut;
