import React, { useContext } from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../contexts/cart.context';
import './cart-icon.styles.scss';

const CartIcon = () => {
    const { isCartOpen, setCartOpen, cartItemsCount } = useContext(CartContext)

    const toggleCart = () => setCartOpen(!isCartOpen)


    return (
        <div className='cart-icon-container' onClick={toggleCart}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{cartItemsCount}</span>
        </div>
    );
};

export default CartIcon;