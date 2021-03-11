import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { startCleaningActiveProduct, startCreatingProduct, startDeletingPicture, startUpdatingProduct } from '../../../actions/products';
import { swalCustomStyle } from '../../../helpers/swalCustom';
import { useForm } from '../../../hooks/useForm'
import { BtnSubmit } from '../Buttons/BtnSubmit';

export const ProductForm = ({categories, closeModal, product}) => {
    
    
    const { id, name:ename, description:edescription, price:eprice, status:estatus, in_discount:ein_discount, discount:ediscount, category_id:ecategory, get_pictures } = product;
    const [formData, handleInputChange, handleInputFileChange] = useForm({
        name: ename || '',
        description: edescription || '',
        price: eprice || '',
        status: estatus || '',
        in_discount: ein_discount || '',
        discount: ediscount || '',
        category: ecategory || '',
        gallery: get_pictures || []
    });
    
    let { name, description, price, status, in_discount, discount, category, gallery } = formData;
    
    useEffect((useForm) => {
    },[gallery])

    const [hasError, setHasError] = useState([]);

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        setHasError([]);
        if( category === '0'){
            setHasError([
                ...hasError,
                'The category field is required'
            ])
            return;
        }
        
        if(Object.keys(product).length <= 0){
            swalCustomStyle.fire({
                icon: 'info',
                title: 'Creating product...',
                showConfirmButton: false,
                timer: 1500
            })
            
            dispatch(startCreatingProduct(name, description, price, status, in_discount, discount, category, gallery));
            closeModal && closeModal()
        }else{
            swalCustomStyle.fire({
                icon: 'info',
                title: 'Updating product...',
                showConfirmButton: false,
                timer: 1500
            })

            dispatch(startUpdatingProduct(id, name, description, price, status, in_discount, discount, category, gallery));
            dispatch(startCleaningActiveProduct);
            closeModal && closeModal()
        }
    }

    const inputGalleryAdd = useRef();
    const handleAddPicture = () => {
        inputGalleryAdd.current.click();
    }

    const handleGalleryChange = () => {
        setHasError([]);

        if(inputGalleryAdd.current.files.length > 5){
            setHasError([
                ...hasError,
                'Maximun 5 pictures allowed'
            ])
        }else{
            handleInputFileChange(inputGalleryAdd.current, inputGalleryAdd.current.files)
        }
    }

    const handleDeletePicture = (id) => {
        dispatch(startDeletingPicture(id))
        gallery = gallery.filter( picture => picture.id !== id)
    }

    

    const baseImgUrl = process.env.REACT_APP_IMG_STORAGE_API_URL;

    return (
        <>  
            { 
                hasError.length > 0 && 
                <div className="alert alert-danger">
                    <h4>Error:</h4>
                    <ul>
                        {
                            hasError.map( (e, key) => <li key={key}>
                                {e}
                            </li>
                        )}
                    </ul>
                </div>
            }

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                    <div className="form-content col-8 col-sm-12">
                        <label className="col-12 col-sm-12">
                            Name: <br/>
                            <input 
                                type="text" 
                                required
                                name="name" 
                                value={name}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className="col-12 col-sm-12">
                            Description: <br/>
                            <textarea 
                                name="description" 
                                required
                                value={description}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className="col-12 col-sm-12">
                            Category <br/>
                            <select name="category" onChange={handleInputChange} defaultValue={category} required>
                                <option className="option" value="0">Select category...</option>
                                {
                                    categories.map( ({id, name}) => 
                                        <option className="option" key={id} value={id}>{name}</option>
                                    )
                                }
                            </select>
                        </label>
                        <div className="row">
                            <label className="col-6 col-sm-12 ">
                                Price: <br/>
                                <input 
                                    type="number" 
                                    name="price" 
                                    required
                                    value={price}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label className="col-6 col-sm-12 flex-1 ml-2">
                                Status <br/>
                                <select name="status" onChange={handleInputChange} defaultValue={status || 0}>
                                    <option className="option" value="0">Draft</option>
                                    <option className="option" value="1">Public</option>
                                </select>
                            </label>
                        </div>
                        <div className="row">
                            <label className="col-6 col-sm-12">
                                In discount? <br/>
                                <select name="in_discount" onChange={handleInputChange} defaultValue={in_discount || 0}>
                                    <option className="option" value="0">No</option>
                                    <option className="option" value="1">Yes</option>
                                </select>
                            </label>
                            {
                                (in_discount === 1 || in_discount === "1") && 
                                ( 
                                    <label className="col-6 col-sm-12 flex-1 ml-2">
                                        Discount (%): <br/>
                                        <input 
                                            type="number" 
                                            name="discount" 
                                            value={discount}
                                            onChange={handleInputChange}
                                        />
                                    </label> 
                                )
                            }
                        </div>
                    </div>
                    <div className="col-4 col-sm-12 flex-1 ml-2">
                        <div className="gallery">
                            <input type="file" name="gallery" multiple ref={inputGalleryAdd} onChange={handleGalleryChange} accept="image/*" className="d-none"/>
                            <label>
                                Gallery <small>( Max 5 pictures )</small>
                                {
                                    gallery.length < 5 &&
                                    <div className="btn-add-pictures my-2" onClick={handleAddPicture}>
                                        <i className="fas fa-plus" aria-hidden="true"></i>
                                    </div>

                                }
                            </label>
                            <div className="text-center">
                                {
                                    gallery.length === 0 &&
                                    <p>
                                        {gallery.length} pictures <br/>selected to upload
                                    </p>
                                }
                                
                                {   
                                    <div className="product-gallery col-12">
                                        {
                                            gallery?.map( ({file_name, id:img_id}) => 
                                                file_name &&
                                                <div className="picture">
                                                    <img key={img_id} src={`${baseImgUrl}products/${id}/${file_name}`} alt=""/>
                                                    <i onClick={() => handleDeletePicture(img_id)} className="fas fa-minus"/>
                                                </div>
                                            )
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                {
                    Object.keys(product).length === 0
                    ?
                    <BtnSubmit color="create" block sm="12" md="12">Create product</BtnSubmit>
                    :
                    <BtnSubmit color="edit" block sm="12" md="12">Edit product</BtnSubmit>
                }
            </div>
        </form>
        </>
    )
}
