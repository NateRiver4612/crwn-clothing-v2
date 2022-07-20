import React, { Fragment, useContext, useEffect } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { selectProducts, selectProductsIsLoading } from '../../store/products/products.seletor';
import { useSelector } from 'react-redux';
import Spinner from '../../components/spinner/spinner.component';


const CategoriesPreview = () => {
    const products = useSelector(selectProducts)
    const prodcutsIsLoading = useSelector(selectProductsIsLoading)


    return (
        <Fragment>
            {prodcutsIsLoading
                ?
                <Spinner></Spinner>
                :
                Object.keys(products).map((title) => {
                    const data = products[title]
                    return (
                        <CategoryPreview key={title} products={data} title={title}></CategoryPreview>
                    )
                })
            }
        </Fragment >
    );
};

export default CategoriesPreview;