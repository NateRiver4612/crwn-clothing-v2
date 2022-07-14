import { useSelector } from 'react-redux/es/exports';
import { selectCartItems } from '../../store/cart/cart.selector';
import './checkout-item.styles.scss'
import { addItemToCartContext, removeItemFromCartContext, clearItemFromCartContext } from '../../store/cart/cart.action';
import { useDispatch } from 'react-redux/es/exports';


const CheckoutItem = ({ cartItem }) => {
    const { name, quantity, price, imageUrl } = cartItem
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()

    const addItemHandler = () => dispatch(addItemToCartContext(cartItems, cartItem))
    const removeItemHandler = () => dispatch(removeItemFromCartContext(cartItems, cartItem))
    const clearItemHandler = () => dispatch(clearItemFromCartContext(cartItems, cartItem))

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'> {name} </span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>
                    &#10095;
                </div>
            </span>
            <span className='price'> {price}</span>
            <div className='remove-button' onClick={clearItemHandler}>
                &#10005;
            </div>
        </div>
    );
};

export default CheckoutItem;