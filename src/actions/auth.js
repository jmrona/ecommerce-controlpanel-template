import Swal from "sweetalert2";
import { fetchSinToken, fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
import { deleteToken, saveToken } from "./token";
 
export const startLogin = (email, password) => {
    return async( dispatch ) => {
        const resp = await fetchSinToken( 'login', {email, password}, 'POST');
        const body = await resp.json();

        if( body.ok ){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            
            dispatch( login({
                email,
                password,
                user: body.user
            }) );
            dispatch( saveToken(body.token));

        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}

export const startRegister = ( name, lastname, email, password ) => {
    return async( dispatch ) => {
        const resp = await fetchSinToken( 'register', {name, lastname, email, password}, 'POST');
        const body = await resp.json();

        if( body.ok ){
            dispatch( login({
                email,
                password,
                user: body.user
            }) );
            Swal.fire('Success', body.msg, 'success')
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}

const login = (user) => ({
    type: types.authLogin,
    payload: user
})

export const startLogout = () => {
    return async(dispatch) => {
        const resp = await fetchConToken( 'logout', {}, 'GET');
        const body = await resp.json();

        if(body.ok){
            localStorage.removeItem('token');
            localStorage.removeItem('token-init-date');
            dispatch( deleteToken() );
            dispatch( logout() );
        }
    }
}

const logout = () => ({ type: types.authLogout })

export const startRecover = (email) => {
    return async(dispatch) => {
        const resp = await fetchSinToken( 'recover', {email}, 'POST');
        const body = await resp.json();
        if(body.ok){
            Swal.fire('Success', body.msg, 'success')
        }
    }
}

export const startResetPassword = (email, code, newPassword) => {
    return async (dispatch) => {
        const resp = await fetchSinToken( 'reset', {email, code, newPassword}, 'POST');
        const body = await resp.json();
        if(body.ok){
            Swal.fire('Success', body.msg, 'success')
        }
    }
}

export const startChecking = () =>{
    return async(dispatch) => {
        const resp = await fetchConToken('renew');
        const body = await resp.json();
        if( body.ok ){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( login({
                user: body.user
            }) );
            dispatch(saveToken(body.token));

        } else {
            dispatch( checkingFinish() );
        }
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });
