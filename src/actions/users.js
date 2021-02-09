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

const usersLoaded = (users) => ({
    type: types.usersLoaded,
    payload: users
})