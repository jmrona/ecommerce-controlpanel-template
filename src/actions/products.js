import { fetchConToken} from "../helpers/fetch";
import { fileUpload } from "../helpers/fileUpload";
import { swalCustomStyle } from "../helpers/swalCustom";
import { types } from "../types/types";
 
export const startGettingProducts = () => {
    return async( dispatch ) => {
        const resp = await fetchConToken('products', {}, 'GET');
        const {ok, products, msg} = await resp.json();
        if(ok){
            dispatch(productLoaded(products))
        }else{
            swalCustomStyle.fire('Error', msg, 'error');
        }
    }
}

export const startCreatingProduct = (name, description, price, status, in_discount, discount, category) => {
    return async( dispatch ) => {
        const resp = await fetchConToken('products', {name, description, price, status, in_discount, discount, category}, 'POST');
        const {ok, products, msg} = await resp.json();
        if(ok){
            swalCustomStyle.fire('Successfully', msg, 'success');
            dispatch(productLoaded(products))
        }else{
            swalCustomStyle.fire('Error', msg, 'error');
        }
    }
}

export const startUpdatingProduct = (id, name, description, price, status, in_discount, discount, category) => {
    return async( dispatch ) => {
        const resp = await fetchConToken('product/'+id, {name, description, price, status, in_discount, discount, category}, 'PUT');
        const {ok, products, msg} = await resp.json();
        if(ok){
            swalCustomStyle.fire('Successfully', msg, 'success');
            dispatch(productLoaded(products))
        }else{
            swalCustomStyle.fire('Error', msg, 'error');
        }
    }
}

export const startDeletingProduct = (id) => {
    return async( dispatch ) => {
        const resp = await fetchConToken('product/'+id, {}, 'DELETE');
        const {ok, products, msg} = await resp.json();
        if(ok){
            swalCustomStyle.fire('Successfully', msg, 'success');
            dispatch(productLoaded(products))
        }else{
            swalCustomStyle.fire('Error', msg, 'error');
        }
    }
}

export const startEditingProduct = (product) => ({
    type: types.productEdit,
    payload: product
})

export const startCleaningActiveProduct = () => ({
    type: types.productCleanActive
})

const productLoaded = (products) => ({
    type: types.productLoaded,
    payload: products
})