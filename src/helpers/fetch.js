const baseUrl = process.env.REACT_APP_API_URL;

export const fetchSinToken = ( endpoint, data, method = 'GET') => {
    const url = `${baseUrl}/${endpoint}`; //localhost:4000/api/auth
    
    if( method === 'GET'){
        return fetch( url , { 
            method,
            // credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    } else {
        return fetch(url, {
            method,
            // credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}

export const fetchConToken = ( endpoint, data, method = 'GET') => {
    const url = `${baseUrl}/${endpoint}`; //localhost:4000/api/auth
    const token = localStorage.getItem('token') || '';
    if( method === 'GET'){
        return fetch( url, {
            method,
            mode: 'cors',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer '+token
            }
        } );
    } else {
        return fetch(url, {
            method,
            mode: 'cors',
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer '+token
            },
            body: JSON.stringify(data)
        })
    }
}
