import React, { useContext } from 'react';
import Button from '../button/button.component';
import './cart-dropdown.styles.scss';
import { CartContext } from '../../contexts/cart.context';
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from 'react-router-dom'

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate()

    const goToCheckOut = () => {
        navigate('/checkout');
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {
                    cartItems.map((cartItem) => <CartItem cartItem={cartItem}></CartItem>)
                }
            </div>
            <Button onClick={goToCheckOut}>GO TO CHECKOUT</Button>
        </div >
    )
};

export default CartDropdown;