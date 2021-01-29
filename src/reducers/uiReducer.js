import { types } from "../types/types";



const initialState = {
    modalOpen: false,
    theme: ''
}



export const uiReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            }

        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false
            }

        case types.uiSetTheme:
            return {
                ...state,
                theme: action.payload
            }
    
        default:
            return state;
    }
}