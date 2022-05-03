import React from 'react';
import './Pagination.css'

const Pagination = ({ pageNumber, currentPage, setCurrentPage, setLoading, setItemPerPage, itemPerPage }) => {

    const handlePrev = () => {
        setCurrentPage(currentPage > 0 ? currentPage - 1 : currentPage)
        setLoading(true)
    }
    const handleNext = () => {
        setCurrentPage((pageNumber - 1) > currentPage ? currentPage + 1 : currentPage)
        setLoading(true)
    }

    const handlePageNumber = number => {
        setCurrentPage(number)
    }

    return (
        <div className='pagination'>
            <button onClick={handlePrev} disabled={currentPage <= 0} className='me-2' > Previous </button>
            {
                [...Array(pageNumber).keys()].map(key => (
                    <button
                        key={key}
                        onClick={() => handlePageNumber(key)}
                        className={key === currentPage ? 'active' : ''} >
                        {key + 1}
                    </button>
                ))
            }
            <button onClick={handleNext} disabled={currentPage >= (pageNumber - 1)}  className='ms-2'> Next </button>

            <select name="page_number" id="page_number" value={itemPerPage} onChange={e => setItemPerPage(parseInt(e.target.value))}>
                {
                    console.log(itemPerPage)
                }
                <option selected={itemPerPage === 9} value="9"> 9 </option>
                <option selected={itemPerPage === 12} value="12"> 12 </option>
                <option selected={itemPerPage === 15} value="15"> 15 </option>
            </select>
        </div>
    );
};

export default Pagination;