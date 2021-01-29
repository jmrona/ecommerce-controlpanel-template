import { types } from "../types/types";


export const saveToken = (token) => ({
    type: types.saveToken,
    payload: token
});

export const updateToken = (token) => ({
    type: types.updateToken,
    token
});

export const deleteToken = () => ({
    type: types.deleteToken
});
