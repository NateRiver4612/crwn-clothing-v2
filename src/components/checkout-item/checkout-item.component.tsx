import { useSelector } from "react-redux/es/exports";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
  addItemToCartContext,
  removeItemFromCartContext,
  clearItemFromCartContext,
} from "../../store/cart/cart.action";
import { useDispatch } from "react-redux/es/exports";
import {
  Arrow,
  BaseSpan,
  CheckoutItemContainer,
  ImageContainer,
  Quantity,
  RemoveButton,
  Value,
} from "./checkout-item.styles";
import { CartItemType } from "../../store/cart/cart.types";

type CheckOutItemProps_Type = {
  cartItem: CartItemType;
};

const CheckoutItem = ({ cartItem }: CheckOutItemProps_Type) => {
  const { name, quantity, price, imageUrl } = cartItem;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const addItemHandler = () =>
    dispatch(addItemToCartContext(cartItems, cartItem));
  const removeItemHandler = () =>
    dispatch(removeItemFromCartContext(cartItems, cartItem));
  const clearItemHandler = () =>
    dispatch(clearItemFromCartContext(cartItems, cartItem));

  return (
    <CheckoutItemContainer className="checkout-item-container">
      <ImageContainer className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan className="name"> {name} </BaseSpan>
      <Quantity className="quantity">
        <Arrow className="arrow" onClick={removeItemHandler}>
          &#10094;
        </Arrow>
        <Value className="value">{quantity}</Value>
        <Arrow className="arrow" onClick={addItemHandler}>
          &#10095;
        </Arrow>
      </Quantity>
      <BaseSpan className="price"> {price}</BaseSpan>
      <RemoveButton className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
