import { types } from "../types/types";

const initialState = {
    auth: {},
    users: [],
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.usersAuth:
            return {
                ...state,
                auth: action.payload
            }

        case types.usersLoaded:
            return {
                ...state,
                users: [...action.payload]
            }

        case types.userUpdated:
            return {
                ...state,
                auth: action.payload
            }

        default:
            return state;
    }
}

