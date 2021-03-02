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


const categoriesLoaded = (categories) => ({
    type: types.categoriesLoaded,
    payload: categories
})