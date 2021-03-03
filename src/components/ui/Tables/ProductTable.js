import React, { useEffect, useRef, useState } from 'react'

import dayjs from 'dayjs'
import ReactPaginate from 'react-paginate'
import Select from 'react-select'

import { Btn } from '../Buttons/Btn';
import { Modal } from '../../shared/Modal';
import { ProductForm } from '../Forms/ProductForm';
import { useDispatch, useSelector } from 'react-redux';
import { BtnFloat } from '../Buttons/BtnFloat';

import { startGettingCategories } from '../../../actions/categories';
import { startCleaningActiveProduct, startEditingProduct, startDeletingProduct } from '../../../actions/products';

export const ProductTable = ({columns, data:products}) => {
    const [offset, setOffset] = useState(0);
    const [perPage, setPerPage] = useState(5);
    const [pageCount, setPageCount] = useState(0);
    const [data, setData] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const [openModal, setOpenModal] = useState(false);

    const handleInputChange = (e) => {
        setSearchInput(e.target.value)
    }

    const handleCreateProduct = () =>{
        dispatch(startCleaningActiveProduct());
        setOpenModal(true);
    }

    const handleEditProduct = (id, name, description, category_id, price, in_discount, discount, status) => {
        const product = {id,
            name, 
            description, 
            category_id, 
            price, 
            in_discount, 
            discount, 
            status
        };
        
        dispatch(startEditingProduct(product));
        setOpenModal(true);
    }
    const {productActive} = useSelector(state => state.products)

    const handleDeleteProduct = (id) => {
        dispatch(startDeletingProduct(id));
    }

    useEffect(() => {
        let slice = [];
        if( searchInput !== ''){
            const productsFiltered = products.filter( product => product.name.toLowerCase().includes(searchInput.toLowerCase()));
            slice = productsFiltered.slice(offset, offset + perPage)
            setPageCount(Math.ceil(productsFiltered.length / perPage))
        }else{
            slice = products.slice(offset, offset + perPage)
            setPageCount(Math.ceil(products.length / perPage))
        }

        const postData = slice.map( ({id, name, description, category_id, price, in_discount, discount, status, created_at}) => 
            <tr key={id}>
                <td className="col-2">{name}</td>
                <td className="col-2">{description}</td>
                <td className="col-2">{price}</td>
                <td className="col-2">{in_discount === 1 ? 'Yes' : 'No'}</td>
                {
                    (in_discount === 1)
                    ? <td className="col-2">{discount} %</td>
                    : <td className="col-2">-</td>
                }
                <td className="col-2">{status === 1 ? 'Public' : 'Draft'}</td>
                <td className="col-2">{ dayjs(created_at).format('DD/MM/YYYY HH:mm:ss')}</td>
                <td className="col-2 d-flex flex-wrap flex-row place-items-center">
                    <div onClick={() => handleEditProduct(id, name, description, category_id, price, in_discount, discount, status)}>
                        <Btn color="edit" md="3" sm="3" css="btn-options btn-sm mx-1 tooltip">
                            <i className="fas fa-pen"></i>
                            <span className="tooltiptext">Edit product</span>
                        </Btn>
                    </div>
                    <div onClick={() => handleDeleteProduct(id)}>
                        <Btn color="delete" md="3" sm="3" css="btn-options btn-sm mx-1 tooltip">
                            <i className="fas fa-trash"></i>
                            <span className="tooltiptext">Delete product</span>
                        </Btn>
                    </div>
                </td>
            </tr>
        );
        setData(postData)
        
    }, [offset, perPage, products, searchInput])

    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startGettingCategories());
    }, [dispatch])

    const {categories} = useSelector(state => state.categories)

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
            <div>
                <div onClick={handleCreateProduct}>
                    <BtnFloat color="create-full"> 
                        <i className="fas fa-plus"/>
                        <span className="ml-3">New product</span>
                    </BtnFloat>
                </div>
            </div>
            <div className="table__header ">
                <div className="table__header-filters">
                    <div className="filter-options d-none" ref={filterRef}>
                        <div className="mr-2 ml-1">
                            <select defaultValue="2">
                                <option value="0">Draft</option>
                                <option value="1">Public</option>
                                <option value="2">Status</option>
                            </select>
                        </div>
                        <div className="mr-2">
                            <select defaultValue="2">
                                <option value="0">No</option>
                                <option value="1">Yes</option>
                                <option value="2">Discount?</option>
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
                Object.keys(productActive).length <= 0
                ?
                <Modal title="Add new product" isOpen={openModal} onClose={() => setOpenModal(false)} >
                    <ProductForm categories={categories} closeModal={()=>setOpenModal(false) } product={productActive || ''}/>
                </Modal>
                :
                <Modal title="Edit product" isOpen={openModal} onClose={() => setOpenModal(false)} >
                    <ProductForm 
                        categories={categories} 
                        closeModal={()=>setOpenModal(false)}
                        product={productActive}
                    />
                </Modal>

            }
        </>
    )
}
