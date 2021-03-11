import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import dayjs from 'dayjs'
import ReactPaginate from 'react-paginate'
import Select from 'react-select'

import { Btn } from '../Buttons/Btn'
import { BtnFloat } from '../Buttons/BtnFloat'
import { Modal } from '../../shared/Modal'
import { CategoryForm } from '../Forms/CategoryForm'

import { startCleaningActiveCategory, startEditingCategory, startDeletingCategory } from '../../../actions/categories'
import { swalCustomStyle } from '../../../helpers/swalCustom'
import Swal from 'sweetalert2'

export const CategoryTable = ({columns, data:categories}) => {

    // Pagination
    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [pageCount, setPageCount] = useState(0);
    const [data, setData] = useState([]);

    // Filters
    const [searchInput, setSearchInput] = useState('');
    const [categoryFilter, setCategoryFilter] = useState(0)

    // Modal
    const [openModal, setOpenModal] = useState(false);

    const handlePageClick = (e) => {
        const {selected} = e;
        setOffset(selected * perPage)
    };

    const [selectedOption, setSelectedOption] = useState({value: "5", label: "5 items"})
    const options = [
        { value: '5', label: '5 items' },
        { value: '10', label: '10 items' },
        { value: '15', label: '15 items' },
    ];

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

    const dispatch = useDispatch();
    
    const handleEditCategory = (id, name, description, main_category) => {
        const category = {
            id,
            name, 
            description, 
            main_category
        };
        dispatch(startEditingCategory(category));
        setOpenModal(true);
    }

    const {categoryActive} = useSelector(state => state.categories);

    const handleDeleteCategory = (id) => {
        swalCustomStyle.fire({
            title: 'Are you sure?',
            text: "If you confirm this action, it will delete this category and subcategories permanently",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
            focusCancel: true,
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startDeletingCategory(id));
                swalCustomStyle.fire({
                    icon: 'info',
                    title: 'Deleting category...',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalCustomStyle.fire('Cancelled','This category is safe','info')
            }
          })
    }

    const handleCreateCategory = () => {
        dispatch(startCleaningActiveCategory());
        setOpenModal(true);
    }

    useEffect(() => {
        let slice = [];
        let categoriesFiltered = [];

        if( searchInput !== ''){
            categoriesFiltered.length > 0
            ? categoriesFiltered = categoriesFiltered.filter( cat => cat.name.toLowerCase().includes(searchInput.toLowerCase()))
            : categoriesFiltered = categories.filter( cat => cat.name.toLowerCase().includes(searchInput.toLowerCase()))
            slice = categoriesFiltered.slice(offset, offset + perPage)
            setPageCount(Math.ceil(categoriesFiltered.length / perPage))
        }

        if( categoryFilter !== 0){
            categoriesFiltered.length > 0
            ? categoriesFiltered = categoriesFiltered.filter( cat => cat.main_category === parseInt(categoryFilter) || cat.id === parseInt(categoryFilter))
            : categoriesFiltered = categories.filter( cat => cat.main_category === parseInt(categoryFilter) || cat.id === parseInt(categoryFilter))
            
            slice = categoriesFiltered.slice(offset, offset + perPage)
            setPageCount(Math.ceil(categoriesFiltered.length / perPage))
        }

        if(searchInput === '' && categoryFilter === 0){
            slice = categories.slice(offset, offset + perPage)
            setPageCount(Math.ceil(categories.length / perPage))
        }

        const postData = slice.map( ({id, name, description, main_category, created_at, main_category_name}) => 
            <tr key={id}>
                <td className="col-2">{name}</td>
                <td className="col-2">{description}</td>
                {
                    (main_category === null || main_category === undefined)
                    ? <td className="col-2">Main category</td>
                    : <td className="col-2">Secondary category</td>
                }
                {
                    (main_category_name === null || main_category_name === undefined)
                    ? <td className="col-2">-</td>
                    : <td className="col-2">{main_category_name}</td>
                }
                <td className="col-2">{ dayjs(created_at).format('DD/MM/YYYY HH:mm:ss')}</td>
                <td className="col-2 d-flex flex-wrap flex-row place-items-center">
                    <div onClick={() => handleEditCategory(id, name, description, main_category)}>
                        <Btn color="edit" md="3" sm="3" css="btn-options btn-sm mx-1 tooltip">
                            <i className="fas fa-pen"></i>
                            <span className="tooltiptext">Edit product</span>
                        </Btn>
                    </div>
                    <div onClick={() => handleDeleteCategory(id)}>
                        <Btn color="delete" md="3" sm="3" css="btn-options btn-sm mx-1 tooltip">
                            <i className="fas fa-trash"></i>
                            <span className="tooltiptext">Delete product</span>
                        </Btn>
                    </div>
                </td>
            </tr>
        );
        setData(postData)
        
    }, [offset, perPage, categories, searchInput, categoryFilter])
    
    const {categories:listCat} = useSelector(state => state.categories);
    const listCatMain = listCat.filter( cat => cat.main_category === null)
    const filterRef = useRef();
    const handleToggleFilter = () => {
        filterRef.current.classList.toggle('d-none');
    }

    const handleInputChange = (e) => {
        setSearchInput(e.target.value)
    }

    const handleCategoryFilter = (e) => {
        console.log(categoryFilter);
        setCategoryFilter(parseInt(e.target.value));
    }

    return (
        <>
            <div className="table__header ">
                <div className="table__header-filters">
                    <div className="filter-options d-none" ref={filterRef}>
                        <div className="mr-2 ml-1">
                            <select defaultValue={categoryFilter} onChange={handleCategoryFilter}>
                                <option value="0">Select category...</option>
                                {
                                    listCatMain.map( cat => <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>)
                                }
                            </select>
                        </div>
                        <div className="searchInput">
                            <input 
                                type="text" 
                                name="search"
                                value={searchInput}
                                onChange={handleInputChange}
                                placeholder="Search product"
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
            <div>
                <div onClick={handleCreateCategory}>
                    <BtnFloat color="create-full"> 
                        <i className="fas fa-plus"/>
                        <span className="ml-3">New category</span>
                    </BtnFloat>
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
            {
                Object.keys(categoryActive).length <= 0
                ?
                <Modal title="Add new category" isOpen={openModal} onClose={() => setOpenModal(false)} >
                    <CategoryForm 
                        closeModal={()=>setOpenModal(false) } 
                        category={categoryActive}/>
                </Modal>
                :
                <Modal title="Edit category" isOpen={openModal} onClose={() => setOpenModal(false)} >
                    <CategoryForm 
                        closeModal={()=>setOpenModal(false)}
                        category={categoryActive}
                    />
                </Modal>

            }
        </>
    )
}
