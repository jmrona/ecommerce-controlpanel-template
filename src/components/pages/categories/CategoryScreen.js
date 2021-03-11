import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { DateComponent } from '../../shared/DateComponent'

import { startGettingCategories } from '../../../actions/categories';
import { Banner } from '../../ui/Banners/Banner';
import { CategoryTable } from '../../ui/Tables/CategoryTable';

export const CategoryScreen = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startGettingCategories());
    }, [dispatch])

    // Table
    const {categories} = useSelector(state => state.categories)

    const colums = ["Name", "Description", "Category type", "Category main", "Created_at", "Actions"];
    const categoriesMain = categories.filter( category => category.main_category === null).length;
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Categories</h1>
                    <DateComponent/>
                </div>
            </div>
            <div className="flex-break"><br/></div>
            <div className="row justify-content-center">
                <Banner color="success" md="3" sm="12" css="m-1" icon="fas fa-check">
                    <p>{categoriesMain}</p>
                    <small>Total main categories</small>
                </Banner>
            </div>
            <div className="row">
                <CategoryTable columns={colums} data={categories}/>
            </div>
        </div>
    )
}
