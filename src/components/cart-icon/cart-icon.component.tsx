import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.tsx';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux/es/exports';
import { setCartOpen } from '../../store/cart/cart.action';
import { CartIconContainer,ItemCount } from './cart-icon.styles';

const CartIcon = () => {
    const dispatch = useDispatch()
    const cartCount = useSelector(selectCartCount)
    const isCartOpen = useSelector(selectIsCartOpen)

    const toggleCartHandler = () => dispatch(setCartOpen(!isCartOpen))

    return (
        <CartIconContainer onClick={toggleCartHandler}>
            <ShoppingIcon className='shopping-icon' />
            <ItemCount>{cartCount as number}</ItemCount>
        </CartIconContainer>
    );
};

export default CartIcon;