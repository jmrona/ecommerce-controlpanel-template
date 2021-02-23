import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../../hooks/useForm';

import Swal from 'sweetalert2';
import { swalCustomStyle } from '../../../helpers/swalCustom';

import { BtnSubmit } from '../../ui/Buttons/BtnSubmit';
import { Card } from '../../ui/Cards/Card';
import { CardMenu } from '../../ui/Cards/CardMenu';
import { Table } from '../../ui/Table/Table';
import { DateComponent } from '../shared/DateComponent';

import { 
    startGettingUsers, 
    startUpdatingUser, 
    startSettingAvatar, 
    startDeletingAvatar 
} from '../../../actions/users';

export const UserScreen = () => {

    const [isDisable, setIsDisable] = useState(true)

    // Form
    const {name, lastname, email, id, avatar} = useSelector(state => state.users.auth)
    const [formData, handleInputChange] = useForm({
        eName: name,
        eLastname: lastname,
        eEmail: email
    })

    const {eName, eLastname, eEmail} = formData;
    
    const handleSubmit = (e) => {
        e.preventDefault();

        setIsDisable(true);

        const dataToUpdate = {
            id,
            'name': eName,
            'lastname': eLastname,
            'email': eEmail,
        }
        dispatch(startUpdatingUser(dataToUpdate))
    }
    
    // Avatar
    const inputAvatar = useRef()
    const handleChangeAvatar = () => {
        inputAvatar.current.click();
    }

    const handleSubmitAvatar = () => {
        const avatar = inputAvatar.current.files[0];
        dispatch(startSettingAvatar(id, avatar))
    }
      
    const handleDeleteAvatar = () => {
        swalCustomStyle.fire({
            title: 'Are you sure?',
            text: "If you delete this picture, you won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
            focusCancel: true,
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startDeletingAvatar(id));
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalCustomStyle.fire('Cancelled','Your picture is safe 😊','error')
            }
          })
    }


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startGettingUsers())
    }, [dispatch])

    // Images directory
    const baseImgUrl = process.env.REACT_APP_IMG_STORAGE_API_URL;

    // Table
    const {users} = useSelector(state => state.users)
    const colums = ["Name","Lastname","Email","Role","Status","Last connection","Actions"]

    // Banners
    const usersActive = users.filter( user => user.status === 0).length;
    const usersBanned = users.filter( user => user.status === 1).length;
    

    return (
        <div className="container">
            <div className="flex-g">
                <h1>Users</h1>
                <DateComponent/>
            </div>
            <div className="flex-break"><br/></div>
            <div className="row">
                <Card color="blue" title="Otro" css="m-1 h-fit" md="2" sm="12">
                    <div className="card-header">
                        <div>My user details</div>
                        <CardMenu id="1">
                            <a onClick={() => setIsDisable(!isDisable)}>
                                {
                                    isDisable
                                    ? 'Edit details'
                                    : 'Cancel edit'
                                }
                            </a>
                        </CardMenu>
                    </div>
                    <div className="card-body d-flex flex-wrap">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="text-center avatar">
                                {
                                    (avatar)
                                    ? <img src={`${baseImgUrl}${id}/${avatar}`} alt="avatar"/>
                                    : <i className="fas fa-user-circle avatar-profile" aria-hidden="true"></i>
                                }
                                       
                                {
                                    !isDisable
                                    &&
                                    <i className="fas fa-pen btn-options edit-avatar" aria-hidden="true" onClick={handleChangeAvatar}></i>
                                }
                                {
                                    !isDisable
                                    &&
                                    <i className="fas fa-trash btn-options delete-avatar" aria-hidden="true" onClick={handleDeleteAvatar}></i>
                                }
                                <input type="file" name="eAvatar" onChange={handleSubmitAvatar} ref={inputAvatar} accept="image/*" className="d-none"/>
                            </div>
                            <div className="flex-break"><br/></div>
                            
                            <div className="m-2">
                                <label className="col-12">Name:</label>
                                <input className="col-12" 
                                    type="text" 
                                    name="eName"
                                    value={eName}
                                    onChange={handleInputChange}
                                    disabled={isDisable}/>
                            </div>
                            <div className="m-2">
                                <label className="col-12">Lastname:</label>
                                <input className="col-12" 
                                    type="text" 
                                    name="eLastname"
                                    value={eLastname}
                                    onChange={handleInputChange}
                                    disabled={isDisable}/>
                            </div>
                            <div className="m-2">
                                <label className="col-12">Email:</label>
                                <input className="col-12" 
                                    type="text" 
                                    name="eEmail"
                                    value={eEmail}
                                    onChange={handleInputChange}
                                    disabled={isDisable}/>
                            </div>
            
                            {
                                isDisable === false
                                && 
                                <BtnSubmit color="success" outline sm="12" md="12" css="m-2">
                                    <i className="fas fa-save mr-2"></i>
                                    Save
                                </BtnSubmit>
                            }
                        </form>
                    </div>
                </Card>
                
                <div className="subrow justify-content-se">
                    <Card color="success" sm="12" md="4" css="m-1">
                        <div className="card-header justify-content-center">
                            <div className="text-center">Active users</div>
                        </div>

                        <div className="card-body">
                            <p className="text-center active-user">
                                {usersActive}
                            </p>
                        </div>
                    </Card>
                    <Card color="danger" sm="12" md="4" css="m-1">
                        <div className="card-header justify-content-center">
                            <div className="text-center">Banned users</div>
                        </div>

                        <div className="card-body">
                            <p className="text-center banned-user">
                                {usersBanned}
                            </p>
                        </div>
                    </Card>
                    
                    <div className="flex-break"><br/></div>

                    <div className="subrow m-5">
                        <Table columns={colums} data={users}/>
                    </div>
                </div>

            </div>
        </div>
    )
}
