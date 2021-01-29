import { types } from "../types/types";

export const uiOpenModal = () => ({
    type: types.uiOpenModal
});

export const uiCloseModal = () => ({
    type: types.uiCloseModal
});

export const uisetTheme = (theme) => ({
    type: types.uiSetTheme,
    payload: theme
})