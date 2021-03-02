import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Card } from '../../ui/Cards/Card'
import { ProductTable } from '../../ui/Tables/ProductTable'
import { DateComponent } from '../shared/DateComponent'

import { startGettingCategories } from '../../../actions/categories'
import { startGettingProducts } from '../../../actions/products'

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
                    <Card color="success" sm="6" md="3" css="m-1 ">
                        <div className="card-header justify-content-center">
                            <div className="text-center">Public</div>
                        </div>

                        <div className="card-body">
                            <p className="text-center active-user">
                                {productsPublic}
                            </p>
                        </div>
                    </Card>
                    <Card color="danger" sm="6" md="3" css="m-1 ">
                        <div className="card-header justify-content-center">
                            <div className="text-center">Drafts</div>
                        </div>

                        <div className="card-body">
                            <p className="text-center active-user">
                                {productsDrafts}
                            </p>
                        </div>
                    </Card>
                    <Card color="success" sm="6" md="3" css="m-1 ">
                        <div className="card-header justify-content-center">
                            <div className="text-center">Discounts actives</div>
                        </div>

                        <div className="card-body">
                            <p className="text-center active-user">
                                {productsOnDeals}
                            </p>
                        </div>
                    </Card>
                    
                </div>
                <div className="row">
                    <ProductTable columns={colums} data={products}/>
                </div>
            </div>
        </>
    )
}
