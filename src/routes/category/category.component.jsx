import React, { useContext, Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { ProductContext } from '../../contexts/product.context';
import ProductCard from '../../components/product-card/product-card.component';
import './category.styles.scss'

const Category = () => {
    const { category } = useParams()
    const [categoryItems, setCategoryItems] = useState([])

    console.log(category)

    const { products } = useContext(ProductContext)

    useEffect(() => {
        setCategoryItems(products[category])
    }, [category, products])

    console.log(products)

    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
                {
                    categoryItems && categoryItems.map((item) => (
                        <ProductCard key={item.id} product={item} />
                    ))
                }
            </div>
        </Fragment>
    );
};

export default Category;