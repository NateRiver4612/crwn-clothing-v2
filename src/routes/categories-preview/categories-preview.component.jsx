import React, { Fragment, useContext, useEffect } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { selectProducts } from '../../store/products/products.seletor';
import { useSelector } from 'react-redux';

const CategoriesPreview = () => {
    const products = useSelector(selectProducts)

    return (
        <Fragment>
            {
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