import React, { Fragment, useContext, useEffect } from 'react';
import { ProductContext } from '../../contexts/product.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';

const CategoriesPreview = () => {
    const { products } = useContext(ProductContext)
    console.log(products)

    return (
        <Fragment>
            {
                Object.keys(products).map((title) => {
                    const data = products[title]
                    return (
                        <CategoryPreview products={data} title={title}></CategoryPreview>
                    )

                })
            }
        </Fragment >
    );
};

export default CategoriesPreview;