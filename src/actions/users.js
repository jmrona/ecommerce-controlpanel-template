import { fetchConToken} from "../helpers/fetch";
import { fileUpload } from "../helpers/fileUpload";
import { swalCustomStyle } from "../helpers/swalCustom";
import { types } from "../types/types";
 
export const startGettingUsers = () => {
    return async( dispatch ) => {
        try {
            const resp = await fetchConToken( 'users', {}, 'GET');
            const body = await resp.json();
            const users = body.users;
            
            dispatch(usersLoaded(users))
        } catch (error) {
            swalCustomStyle.fire('Error', 'Sorry but we didn\'t find users', 'error');
        }
    }
}
export const startUpdatingUser = (data) => {
    return async( dispatch ) => {
        const {id, name, lastname, email} = data;
        
        const resp = await fetchConToken( 'user/'+id, {name, lastname, email}, 'PUT');
        const body = await resp.json();

        if(body.ok){
            const users = body.users;
            const user_updated = body.user_updated;

            dispatch(usersUpdated(user_updated))
            dispatch(usersLoaded(users))

            swalCustomStyle.fire('Successfully', body.msg, 'success');
        }else{
            swalCustomStyle.fire('Error', body.msg, 'error')
        }
        
    }
}

export const startSettingAvatar = (id, avatar) => {
    return async( dispatch ) => {
        const resp = await fileUpload( 'user/'+id+'/avatar', {avatar});
        console.log(resp)
        if(resp.ok){
            dispatch(usersUpdated(resp.user))
            swalCustomStyle.fire('Successfully', resp.msg, 'success');
        }else{
            swalCustomStyle.fire('Error', resp.msg, 'error')
        }
    }
}

export const startDeletingAvatar = (id) => {
    return async( dispatch ) => {
        const resp = await fetchConToken( 'user/'+id+'/avatar', {id}, 'DELETE')
        const body = await resp.json();
        if(body.ok){
            dispatch(usersUpdated(body.user))
            swalCustomStyle.fire('Successfully', body.msg, 'success');
        }else{
            swalCustomStyle.fire('Error', body.msg, 'error')
        }
    }
}

export const startBanningUser = (id) => {
    return async( dispatch ) => {
        const resp = await fetchConToken( 'user/'+id+'/setBan', {id}, 'POST')
        const body = await resp.json();
        if(body.ok){
            dispatch(usersLoaded(body.users))
            swalCustomStyle.fire('Successfully', body.msg, 'success');
        }else{
            swalCustomStyle.fire('Error', body.msg, 'error')
        }
    }
}

export const startRemovingBanUser = (id) => {
    return async( dispatch ) => {
        const resp = await fetchConToken( 'user/'+id+'/removeBan', {id}, 'POST')
        const body = await resp.json();
        if(body.ok){
            dispatch(usersLoaded(body.users))
            swalCustomStyle.fire('Successfully', body.msg, 'success');
        }else{
            swalCustomStyle.fire('Error', body.msg, 'error')
        }
    }
}

export const usersAuth = (user_auth) => ({
    type: types.usersAuth,
    payload: user_auth
})

const usersLoaded = (users) => ({
    type: types.usersLoaded,
    payload: users
})

const usersUpdated = (user_updated) => ({
    type: types.userUpdated,
    payload: user_updated
})