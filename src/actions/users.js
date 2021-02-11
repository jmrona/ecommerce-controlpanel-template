import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
 
export const startGettingUsers = () => {
    return async( dispatch ) => {
        try {
            const resp = await fetchConToken( 'users', {}, 'GET');
            const body = await resp.json();
            const users = body.users;
            
            dispatch(usersLoaded(users))
        } catch (error) {
            Swal.fire('Error', 'Sorry but we didn\'t find users', 'error');
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

                Swal.fire('Successfully', body.msg, 'success');
            }else{
                Swal.fire('Error', body.msg, 'error')
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