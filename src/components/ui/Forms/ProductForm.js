import React from 'react'
import { useDispatch } from 'react-redux';
import { startCleaningActiveProduct, startCreatingProduct, startUpdatingProduct } from '../../../actions/products';
import { useForm } from '../../../hooks/useForm'
import { BtnSubmit } from '../Buttons/BtnSubmit';

export const ProductForm = ({categories, closeModal, product}) => {
    const { id, name:ename, description:edescription, price:eprice, status:estatus, in_discount:ein_discount, discount:ediscount, category_id:ecategory } = product;
    const [formData, handleInputChange] = useForm({
        name: ename || '',
        description: edescription || '',
        price: eprice || '',
        status: estatus || '',
        in_discount: ein_discount || '',
        discount: ediscount || '',
        category: ecategory || '0',
    });

    const { name, description, price, status, in_discount, discount, category } = formData;

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(Object.keys(product).length <= 0){
            dispatch(startCreatingProduct(name, description, price, status, in_discount, discount, category));
            closeModal && closeModal()
        }else{
            dispatch(startUpdatingProduct(id, name, description, price, status, in_discount, discount, category));
            dispatch(startCleaningActiveProduct);
            closeModal && closeModal()
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <label className="col-12 col-sm-12">
                    Name: <br/>
                    <input 
                        type="text" 
                        name="name" 
                        value={name}
                        onChange={handleInputChange}
                    />
                </label>
                <label className="col-12 col-sm-12">
                    Description: <br/>
                    <textarea 
                        name="description" 
                        value={description}
                        onChange={handleInputChange}
                    />
                </label>
                <label className="col-12 col-sm-12">
                    Category <br/>
                    <select name="category" onChange={handleInputChange} defaultValue={category}>
                        <option className="option" value="0">Select category...</option>
                        {
                            categories.map( ({id, name}) => 
                                <option className="option" key={id} value={id}>{name}</option>
                            )
                        }
                    </select>
                </label>
                <label className="col-2 col-sm-12 flex-1">
                    Price: <br/>
                    <input 
                        type="number" 
                        name="price" 
                        value={price}
                        onChange={handleInputChange}
                    />
                </label>
                <label className="col-2 col-sm-12 flex-1 ml-2">
                    In discount? <br/>
                    <select name="in_discount" onChange={handleInputChange} defaultValue={in_discount || 0}>
                        <option className="option" value="0">No</option>
                        <option className="option" value="1">Yes</option>
                    </select>
                </label>
                {
                    (in_discount === 1 || in_discount === "1") && 
                    ( 
                        <label className="col-2 col-sm-12 flex-1 ml-2">
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
                <label className="col-2 col-sm-12 flex-1 ml-2">
                    Status <br/>
                    <select name="status" onChange={handleInputChange} defaultValue={status || 0}>
                        <option className="option" value="0">Draft</option>
                        <option className="option" value="1">Public</option>
                    </select>
                </label>
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
    )
}
