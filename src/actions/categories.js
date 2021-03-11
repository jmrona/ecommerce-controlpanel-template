import { fetchConToken} from "../helpers/fetch";
import { swalCustomStyle } from "../helpers/swalCustom";
import { types } from "../types/types";
 
export const startGettingCategories = () => {
    return async( dispatch ) => {
        const resp = await fetchConToken('categories', {}, 'GET');
        const body = await resp.json();
        if(body.ok){
            const {categories} = body;
            dispatch(categoriesLoaded(categories))
        }else{
            swalCustomStyle.fire('Error', 'Sorry but we didn\'t find products', 'error');
        }
    }
}

export const startCreatingCategory = (name, description, main_category) => {
    return async( dispatch ) => {
        const resp = await fetchConToken('categories', {name, description, main_category}, 'POST');
        const {ok, categories, msg} = await resp.json();
        
        if(ok){
            swalCustomStyle.fire('Successfully', msg, 'success');
            dispatch(categoriesLoaded(categories))
        }else{
            swalCustomStyle.fire('Error', msg, 'error');
        }
    }
}

export const startUpdatingCategory = (id, name, description, main_category) => {
    return async( dispatch ) => {
        const resp = await fetchConToken('category/'+id, {name, description, main_category}, 'PUT');
        const {ok, categories, msg} = await resp.json();
        
        if(ok){
            swalCustomStyle.fire('Successfully', msg, 'success');
            dispatch(categoriesLoaded(categories))
        }else{
            swalCustomStyle.fire('Error', msg, 'error');
        }
    }
}

export const startDeletingCategory = (id) => {
    return async( dispatch ) => {
        const resp = await fetchConToken('category/'+id, {}, 'DELETE');
        const {ok, categories, msg} = await resp.json();
        
        if(ok){
            swalCustomStyle.fire('Successfully', msg, 'success');
            dispatch(categoriesLoaded(categories))
        }else{
            swalCustomStyle.fire('Error', msg, 'error');
        }
    }
}


const categoriesLoaded = (categories) => ({
    type: types.categoriesLoaded,
    payload: categories
})

export const startEditingCategory = (category) => ({
    type: types.categoryEdit,
    payload: category
})

export const startCleaningActiveCategory = () => ({
    type: types.categoryCleanActive
})