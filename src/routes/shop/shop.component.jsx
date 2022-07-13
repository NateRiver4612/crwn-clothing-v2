import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setProducts } from "../../store/products/products.action";
import { useDispatch } from "react-redux/es/exports";

const Shop = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const getCategoriesHandler = async () => {
            const data = await getCategoriesAndDocuments()
            dispatch(setProducts(data))
        }

        getCategoriesHandler()
    }, [dispatch])

    return (
        <Routes>
            <Route index element={<CategoriesPreview />}></Route>
            <Route path=":category" element={<Category />}></Route>
        </Routes>
    );
};

export default Shop;