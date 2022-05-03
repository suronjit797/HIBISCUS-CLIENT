import React from 'react';
import './Pagination.css'

const Pagination = ({ pageNumber, currentPage, setCurrentPage, setLoading }) => {
    console.log(pageNumber);

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
        <div className='pagination'  >
            <button onClick={handlePrev} disabled={currentPage <= 0} > Previous </button>
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
            <button onClick={handleNext} disabled={currentPage >= (pageNumber - 1)}> Next </button>
        </div>
    );
};

export default Pagination;