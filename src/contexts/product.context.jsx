import { useState, createContext, useEffect } from "react";
// import { uploadCollectionAndDocuments } from "../utils/firebase/firebase.utils";
// import FIREBASE_DATA from "../firebase-data";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const ProductContext = createContext({
    products: {},

})

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState({})

    const getCategoriesHandler = async () => {
        const data = await getCategoriesAndDocuments()
        setProducts(data)
    }

    useEffect(() => {
        // uploadCollectionAndDocuments('categories', FIREBASE_DATA)
        getCategoriesHandler()
    }, [])


    const value = { products }

    return <ProductContext.Provider value={value}>
        {children}
    </ProductContext.Provider>
}

