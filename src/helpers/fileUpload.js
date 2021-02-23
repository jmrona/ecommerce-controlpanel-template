import Swal from "sweetalert2";

const baseUrl = process.env.REACT_APP_API_URL;

export const fileUpload = async (endpoint, files) => {
    const url = `${baseUrl}/${endpoint}`;

    const token = localStorage.getItem('token') || '';

    let formData = new FormData();
    formData.append('upload_preset', 'react-ecommerce');
    formData.append('file', files['avatar']);

    try{
        const resp = await fetch( url, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': 'Bearer '+token
            },
        })
        console.log(resp);
        if ( resp.ok ){
            Swal.fire('Successfully', resp.msg, 'success')
            return await resp.json();
        }else{
            Swal.fire('Error', resp.msg, 'error')
            throw await resp.json();
        }

    }catch (error){
        throw error
    }
}