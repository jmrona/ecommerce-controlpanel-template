import { types } from "../types/types";

const initialState = {
    categories: [],
    categoryActive: {}
}

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.categoriesLoaded:
            return {
                ...state,
                categories: action.payload
            }

        case types.categoryEdit:
            return {
                ...state,
                categoryActive: action.payload
            }

        case types.categoryCleanActive:
            return {
                ...state,
                categoryActive: {}
            }

        default:
            return state;
    }
}