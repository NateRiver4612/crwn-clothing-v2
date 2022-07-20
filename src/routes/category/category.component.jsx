import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card/product-card.component';
import './category.styles.scss'
import { selectProducts, selectProductsIsLoading } from '../../store/products/products.seletor';
import { useSelector } from 'react-redux/es/exports';
import Spinner from '../../components/spinner/spinner.component';


const Category = () => {
    const { category } = useParams()
    const [categoryItems, setCategoryItems] = useState([])

    const products = useSelector(selectProducts)
    const productsIsLoading = useSelector(selectProductsIsLoading)

    useEffect(() => {
        setCategoryItems(products[category])
    }, [category, products])



    return (
        <Fragment>
            {
                productsIsLoading
                    ? <Spinner></Spinner>
                    : <Fragment>
                        <h2 className='category-title'>{category.toUpperCase()}</h2>
                        <div className='category-container'>
                            {
                                categoryItems && categoryItems.map((item) => (
                                    <ProductCard key={item.id} product={item} />
                                ))
                            }
                        </div>
                    </Fragment>
            }


        </Fragment>
    );
};

export default Category;