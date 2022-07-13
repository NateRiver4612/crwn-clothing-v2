import { createContext, useReducer } from "react";
import { createAction } from '../utils/reducer/reducer.utils'

export const CartContext = createContext({
    isCartOpen: false,
    setCartOpen: () => { },
    cartItems: [],
    cartItemsCount: 0,
    addItemToCartContext: () => { },
    clearItemFromCartContext: () => { },
    removeItemFromCartContext: () => { },
    cartTotal: 0
})

const addCartItemHelper = (cartItems, itemToAdd) => {
    //check if item is existed
    const itemExisted = cartItems.find((item) => itemToAdd.id === item.id)

    if (itemExisted) {
        //return new array with Increase quantity of itemToAdd
        return cartItems.map((item) =>
            item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        )
    }

    return [...cartItems, { ...itemToAdd, quantity: 1 }]
}

const removeCartItemHelper = (cartItems, itemToRemove) => {
    //check if item is existed
    const itemExisted = cartItems.find((item) => itemToRemove.id === item.id)

    //check if quanity of item is equal to 1 then we remove it from  cartItems
    if (itemExisted.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id)
    }

    return cartItems.map((item) =>
        item.id === itemToRemove.id ? { ...item, quantity: item.quantity - 1 } : item
    )
}

const clearCartItemHelper = (cartItems, itemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== itemToClear.id)
}

const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_CART_TOTAL: 'SET_CART_TOTAL',
};

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};


const CartReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
}




export const CartProvider = ({ children }) => {

    const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] = useReducer(CartReducer, INITIAL_STATE)

    const updateNewCartItems = (newCartItems) => {
        //count cart items every cart items change
        const itemsCount = newCartItems.reduce((total, item) => item.quantity + total, 0)

        //calculate cart total every time cart items change
        const itemsTotal = newCartItems.reduce((total, item) => total + item.quantity * item.price, 0)

        const payload = {
            cartItems: newCartItems,
            cartCount: itemsCount,
            cartTotal: itemsTotal
        }

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload))
    }

    const addItemToCartContext = (item) => {
        const newCartItems = addCartItemHelper(cartItems, item)
        updateNewCartItems(newCartItems)
    }

    const removeItemFromCartContext = (item) => {
        const newCartItems = removeCartItemHelper(cartItems, item)
        updateNewCartItems(newCartItems)
    }

    const clearItemFromCartContext = (item) => {
        const newCartItems = clearCartItemHelper(cartItems, item)
        updateNewCartItems(newCartItems)
    }

    const setCartOpen = () => {
        const payload = !isCartOpen
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, payload))
    }


    const value = {
        isCartOpen,
        setCartOpen,
        addItemToCartContext,
        cartItems,
        cartCount,
        removeItemFromCartContext,
        clearItemFromCartContext,
        cartTotal
    };

    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}
