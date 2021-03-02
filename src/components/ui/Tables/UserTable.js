import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';

import dayjs from 'dayjs'
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import Swal from 'sweetalert2';

import { Btn } from '../Buttons/Btn';
import { swalCustomStyle } from '../../../helpers/swalCustom';
import { startBanningUser, startRemovingBanUser } from '../../../actions/users';
import { startRecover } from '../../../actions/auth';


export const UserTable = ({columns, data:users}) => {
    
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage, setPerPage] = useState(5);
    const [pageCount, setPageCount] = useState(0);
    const [searchInput, setSearchInput] = useState('');

    const dispatch = useDispatch();
    
    const handleInputChange = (e) => {
        setSearchInput(e.target.value)
    }

    const handleSentRecoveryPassword = (email) => {
        swalCustomStyle.fire({
            title: 'Are you sure?',
            text: "If you confirm this action, it will send an email to the user with a recovery code to recover the password",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, send it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
            focusCancel: true,
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startRecover(email));
                swalCustomStyle.fire({
                    icon: 'info',
                    title: 'Sending email...',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalCustomStyle.fire('Cancelled','Your didn\'t sent a recovery password email','error')
            }
          })
    }
    const handleBanUser = (id) => {
        swalCustomStyle.fire({
            title: 'Are you sure?',
            text: "If you confirm this action, it will ban the user and he/she will not be able to log in to the website",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, ban it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
            focusCancel: true,
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startBanningUser(id));
                swalCustomStyle.fire({
                    icon: 'info',
                    title: 'Banning user...',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalCustomStyle.fire('Cancelled','Your didn\'t ban this user','error')
            }
          })
    }

    const handleRemoveBanUser = (id) => {
        swalCustomStyle.fire({
            title: 'Are you sure?',
            text: "If you confirm this action, it will remove the ban to the user and he/she will be able to log in to the website",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
            focusCancel: true,
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startRemovingBanUser(id));
                swalCustomStyle.fire({
                    icon: 'info',
                    title: 'Removing ban to the user...',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalCustomStyle.fire('Cancelled','This user is still banned','error')
            }
          })
    }

    useEffect(() => {
        let slice = [];
        if( searchInput !== ''){
            const usersFiltered = users.filter( user => user.email.toLowerCase().includes(searchInput.toLowerCase()))
            slice = usersFiltered.slice(offset, offset + perPage)
            setPageCount(Math.ceil(usersFiltered.length / perPage))
        }else{
            slice = users.slice(offset, offset + perPage)
            setPageCount(Math.ceil(users.length / perPage))
        }
        const postData = slice.map( ({id, name, lastname, email, role, status, last_connection}) => 
            <tr key={id}>
                <td className="col-2">{name}</td>
                <td className="col-2">{lastname}</td>
                <td className="col-2">{email}</td>
                <td className="col-2">{role === 1 ? 'Admin' : 'Customer'}</td>
                <td className="col-2">{status === 1 ? 'Banned' : 'Authorized'}</td>
                {/* Cambiar update_at por last_conection que se guardará cada vez que actualice el token  */}
                <td className="col-2">{ 
                    last_connection
                    ? dayjs(last_connection).format('DD/MM/YYYY HH:m:s')
                    : '-'
                    }
                </td>
                <td className="col-2 d-flex flex-wrap flex-row place-items-center">
                    <div onClick={() => handleSentRecoveryPassword(email)}>
                        <Btn color="create" md="3" sm="3" css="btn-options btn-sm mx-1 tooltip">
                            <i className="fas fa-paper-plane"></i>
                            <span className="tooltiptext">Recovery password</span>
                        </Btn>
                    </div>
                    {
                        status === 0
                        ?
                        <div onClick={() => handleBanUser(id)}>
                            <Btn color="delete" md="3" sm="3" css="btn-options btn-sm mx-1 tooltip">
                                <i className="fas fa-ban"></i>
                                <span className="tooltiptext">Ban user</span>
                            </Btn>
                        </div>
                        :
                        <div onClick={() => handleRemoveBanUser(id)}>
                            <Btn color="create" md="3" sm="3" css="btn-options btn-sm mx-1 tooltip">
                                <i className="fas fa-check-circle"></i>
                                <span className="tooltiptext">Remove ban</span>
                            </Btn>
                        </div>
                    }
                </td>
            </tr>
        );
        setData(postData)
    }, [offset, perPage, users, searchInput])

    const [selectedOption, setSelectedOption] = useState({value: "5", label: "5 items"})
    const options = [
        { value: '5', label: '5 items' },
        { value: '10', label: '10 items' },
        { value: '15', label: '15 items' },
    ];

    const handlePageClick = (e) => {
        const {selected} = e;
        setOffset(selected * perPage)
    };

    const handleSelectItems = (e) =>{
        setPerPage(e.value);
        setSelectedOption(e);
    }

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            borderBottom: '1px solid var(--border-color-table)',
            color: state.isSelected ? 'var(--colorText)' : 'var(--main-color)',
            padding: 5,
            textAlign: 'left',
        })
    }

    const filterRef = useRef();

    const handleToggleFilter = () => {
        filterRef.current.classList.toggle('d-none');
    }

    return (
        <>
            <div className="table__header">
                <div className="table__header-filters">
                    <div className="filter-options d-none" ref={filterRef}>
                        <div className="searchInput ml-1">
                            <input 
                                type="text" 
                                name="search"
                                value={searchInput}
                                onChange={handleInputChange}
                                placeholder="Search email"
                            />
                            <div className="icon-search">
                                <i className="fas fa-search"></i>
                            </div>
                        </div>
                    </div>
                    <div className="btn-filter">
                        <i className="fas fa-filter p-2 pointer" onClick={handleToggleFilter}/>
                    </div>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        {   
                            columns.map( column => (
                                <th className="col-2" key={column}>{column}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0
                        ? (data)
                        : (<tr>
                           <td colSpan={columns.length} className="col-12 text-center">No data found</td> 
                        </tr>)
                    }
                </tbody>
            </table>

            <div className="table__footer mt-5">
                <div className="subrow justify-content-center align-items-center">
                    {
                        pageCount > 0
                        &&
                    
                        <ReactPaginate
                            previousLabel={<i className="fas fa-arrow-left"></i>}
                            nextLabel={<i className="fas fa-arrow-right"></i>}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}    
                        />
                    }
                    {
                        pageCount > 0
                        &&

                        <Select
                            value={selectedOption}
                            onChange={handleSelectItems}
                            options={options}
                            styles={customStyles}
                        />
                    }
                    
                </div>
            </div>
        </>
    )
}
