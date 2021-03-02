import { types } from "../types/types";

const initialState = {
    products: [],
    productActive: {}
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.productLoaded:
            return {
                ...state,
                products: action.payload,
                productActive: {}
            }

        case types.productEdit:
            return {
                ...state,
                productActive: action.payload
            }

        case types.productCleanActive:
            return {
                ...state,
                productActive: {}
            }
            
        default:
            return state;
    }
}