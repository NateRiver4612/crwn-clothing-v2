import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setCartOpen: () => { },
    cartItems: [],
    cartItemsCount: 0,
    addItemToCartContext: () => { },
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


export const CartProvider = ({ children }) => {
    const [isCartOpen, setCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartItemsCount, setItemsCount] = useState(0)

    //count cart items every cart items change 
    useEffect(() => {
        const itemsCount = cartItems.reduce((total, item) => item.quantity + total, 0)
        setItemsCount(itemsCount);
    }, [cartItems])


    const addItemToCartContext = (item) => {
        setCartItems(addCartItemHelper(cartItems, item))
    }

    const removeItemFromCartContext = (item) => {
        setCartItems(removeCartItemHelper(cartItems, item))
    }

    const clearItemFromCartContext = (item) => {
        setCartItems(clearCartItemHelper(cartItems, item))
    }

    const value = {
        isCartOpen,
        setCartOpen,
        addItemToCartContext,
        cartItems,
        cartItemsCount,
        removeItemFromCartContext,
        clearItemFromCartContext
    };

    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}
