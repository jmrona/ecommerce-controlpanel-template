import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import ReactPaginate from 'react-paginate';


export const Table = ({columns, data:users}) => {
    
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage, setPerPage] = useState(5);
    const [pageCount, setPageCount] = useState(0);
    const [searchInput, setSearchInput] = useState('');

    const handleInputChange = (e) => {
        setSearchInput(e.target.value)
    }

    useEffect(() => {
        if( searchInput !== ''){
            var slice = users.filter( user => user.email.includes(searchInput)).slice(offset, offset + perPage)
            setPageCount(Math.ceil(users.includes(searchInput).length / perPage))
        }else{
            var slice = users.slice(offset, offset + perPage)
            setPageCount(Math.ceil(users.length / perPage))
        }
        const postData = slice.map( pd => 
            <tr key={pd.id}>
                <td className="col-2">{pd.name}</td>
                <td className="col-2">{pd.lastname}</td>
                <td className="col-2">{pd.email}</td>
                <td className="col-2">{pd.role_id}</td>
                <td className="col-2">{pd.status}</td>
                <td className="col-2">{ dayjs(pd.update_at).format('DD/MM/YYYY')}</td>
                <td className="col-1">
                    <button>
                        <i className="fas fa-pen"></i>
                    </button>
                    <button>
                        <i className="fas fa-trash"></i>
                    </button>
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

    return (
        <>
            <div className="table-header">
                <input 
                    type="text" 
                    name="search"
                    value={searchInput}
                    onChange={handleInputChange}
                    placeholder="test@test.com"
                    className="col-2 searchInput"
                />
                <div className="icon-search">
                    <i className="fas fa-search"></i>
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
                    {data}
                </tbody>
            </table>

            <div className="table-footer mt-5">
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
