import { types } from "../types/types";

const initialState = {
    token:''
}

export const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.getToken:
            return {
                ...state
            }

        case types.saveToken:
            return {
                ...state,
                token: action.payload
            }

        case types.updateToken:
            return {
                ...state,
                token: action.payload
            }

        case types.deleteToken:
            return {
                ...action.payload
            }

        default:
            return state;
    }
}