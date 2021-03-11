import { fetchConToken, fetchConTokenAndFile } from "../helpers/fetch";
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

export const startCreatingProduct = (name, description, price, status, in_discount, discount, category, gallery) => {
    return async( dispatch ) => {
        let formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('status', status);
        formData.append('in_discount', in_discount);
        formData.append('discount', discount);
        formData.append('category', category);
        for (let i = 0; i < gallery.length; i++) {
            formData.append('files[]', gallery[i]);
        }

        const resp = await fetchConTokenAndFile('products', {formData}, 'POST');
        const {data} = resp
        const {ok, products, msg} = data;
        if(ok){
            swalCustomStyle.fire('Successfully', msg, 'success');
            dispatch(productLoaded(products))
        }else{
            swalCustomStyle.fire('Error', msg, 'error');
        }
    }
}

export const startUpdatingProduct = (id, name, description, price, status, in_discount, discount, category, gallery) => {
    return async( dispatch ) => {
        let formData = new FormData();
        formData.append('id', id);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('status', status);
        formData.append('in_discount', in_discount);
        formData.append('discount', discount);
        formData.append('category', category);
        for (let i = 0; i < gallery.length; i++) {
            formData.append('files[]', gallery[i]);
        }

        const resp = await fetchConTokenAndFile('product/'+id, {formData}, 'POST');
        const {data} = resp
        const {ok, products, msg} = data;
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

export const startDeletingPicture = (id) => {
    return async( dispatch ) => {
        const resp = await fetchConToken('picture/'+id, {}, 'DELETE');
        const {ok, products, product_updating, msg} = await resp.json();
        if(ok){
            swalCustomStyle.fire('Successfully', msg, 'success');
            dispatch(productLoaded(products))
            dispatch(startEditingProduct(product_updating))
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