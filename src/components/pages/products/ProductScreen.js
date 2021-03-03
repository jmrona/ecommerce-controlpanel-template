import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Card } from '../../ui/Cards/Card'
import { ProductTable } from '../../ui/Tables/ProductTable'
import { DateComponent } from '../../shared/DateComponent'

import { startGettingCategories } from '../../../actions/categories'
import { startGettingProducts } from '../../../actions/products'
import { Banner } from '../../ui/Banners/Banner'

export const ProductScreen = () => {
   
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startGettingProducts());
        dispatch(startGettingCategories());
    }, [dispatch])
    
    // Table
    const {products} = useSelector(state => state.products)
    const colums = ["Name","Description","Price","In discount?","Discount","Status","Created_at", "Actions"]

    // Banners
    const productsPublic = products.filter( product => product.status === 1).length;
    const productsDrafts = products.filter( product => product.status === 0).length;
    const productsOnDeals = products.filter( product => product.in_discount === 1).length;

    return (
        <>
            <div className="container">
                <div>
                    <h1>Products</h1>
                    <DateComponent/>
                </div>
                <div className="flex-break"><br/></div>
                <div className="row justify-content-se">
                    <Banner color="success" md="3" sm="12" css="m-1" icon="fas fa-check">
                        <p>{productsPublic}</p>
                        <small>Products public</small>
                    </Banner>

                    <Banner color="danger" md="3" sm="12" css="m-1" icon="fas fa-trash">
                        <p>{productsDrafts}</p>
                        <small>Products drafts</small>
                    </Banner>

                    <Banner color="blue" md="3" sm="12" css="m-1" icon="fas fa-percent">
                        <p>{productsOnDeals}</p>
                        <small>Discounts active</small>
                    </Banner>
                    
                </div>
                <div className="row">
                    <ProductTable columns={colums} data={products}/>
                </div>
            </div>
        </>
    )
}
