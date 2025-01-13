import React from 'react'

import "../../style/pagination.css"

const Pagination = ({currentPage, totalPages, onPageChange}) => {
    const pageNumbers = [];
    for(let index = 1; index <= totalPages; index++){
        pageNumbers.push(index);

    }

    return(
        <div className="pagination">
            {pageNumbers.map((number) =>(
                <button
                key={number}
                onClick={() => onPageChange(number)}
                className={number === currentPage ? 'active': ''}>
                    {number}
                </button>
            )) }
        </div>
    )
}

export default Pagination;
