import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { DateComponent } from '../../shared/DateComponent'

import { startGettingCategories } from '../../../actions/categories';

export const CategoryScreen = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startGettingCategories());
    }, [dispatch])

    // Table
    const {categories} = useSelector(state => state.categories)
    //  Category type: main || subcategory
    // If it's a subcategory, Category main will be the name of the father category
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
        </div>
    )
}
