import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../../hooks/useForm';

import { startCleaningActiveCategory, startCreatingCategory, startUpdatingCategory } from '../../../actions/categories';

import { BtnSubmit } from '../Buttons/BtnSubmit';
import { swalCustomStyle } from '../../../helpers/swalCustom';

export const CategoryForm = ({closeModal, category}) => {

    const [hasError, setHasError] = useState([]);

    const { id, name:ename, description:edescription, main_category:emain_category} = category;

    const [formData, handleInputChange] = useForm({
        name: ename || '',
        description: edescription || '',
        main_category: emain_category || '0',
    });
    
    let { name, description, main_category } = formData;

    const {categories} = useSelector(state => state.categories)
    const categoriesMain = categories.filter( cat => cat.main_category === null || cat.main_category === undefined);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(name.length === 0){
            setHasError([]);
            setHasError([
                ...hasError,
                'the name field is required'
            ])
        }

        if( hasError.length > 0){
            return;
        }

        if(Object.keys(category).length <= 0){
            swalCustomStyle.fire({
                icon: 'info',
                title: 'Creating category...',
                showConfirmButton: false,
                timer: 1500
            })
            dispatch(startCreatingCategory(name, description, main_category));
            closeModal && closeModal()
        }else{
            swalCustomStyle.fire({
                icon: 'info',
                title: 'Updating category...',
                showConfirmButton: false,
                timer: 1500
            })
            dispatch(startUpdatingCategory(id, name, description, main_category));
            dispatch(startCleaningActiveCategory);
            closeModal && closeModal()
        }
    }

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

            <form onSubmit={handleSubmit}>
                <div className="row justify-content-center">
                    <div className="form-content col-11 col-sm-12">
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
                                value={description}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label className="col-12 col-sm-12">
                            Main category: <br/>
                            <select name="main_category" onChange={handleInputChange} defaultValue={main_category} required>
                                <option className="option" value="0">Select category...</option>
                                {
                                    categoriesMain.map( ({id, name}) => 
                                        <option className="option" key={id} value={id}>{name}</option>
                                    )
                                }
                            </select>
                        </label>

                        {
                            Object.keys(category).length === 0
                            ?
                            <BtnSubmit color="create" block sm="12" md="12" css="mt-5 mb-3">Create category</BtnSubmit>
                            :
                            <BtnSubmit color="edit" block sm="12" md="12" css="mt-5 mb-3">Edit category</BtnSubmit>
                        }
                    </div>
                </div>
            </form>
        </>
    )
}
