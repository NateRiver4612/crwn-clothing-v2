import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { setProductsStart } from "../../store/products/products.action";
import { useDispatch } from "react-redux/es/exports";

const Shop = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setProductsStart())
    }, [])

    return (
        <Routes>
            <Route index element={<CategoriesPreview />}></Route>
            <Route path=":category" element={<Category />}></Route>
        </Routes>
    );
};

export default Shop;