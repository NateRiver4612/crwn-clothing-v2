import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux/es/exports';
import { setCartOpen } from '../../store/cart/cart.action';

const CartIcon = () => {
    const dispatch = useDispatch()
    const cartCount = useSelector(selectCartCount)
    const isCartOpen = useSelector(selectIsCartOpen)


    const toggleCartHandler = () => dispatch(setCartOpen(!isCartOpen))


    return (
        <div className='cart-icon-container' onClick={toggleCartHandler}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{cartCount}</span>
        </div>
    );
};

export default CartIcon;