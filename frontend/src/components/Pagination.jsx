import React from 'react';


const Pagination = ({pages, currentPage, onPageChange}) => {
    return(
        <nav>
            <ul className="pagination">
                {/* Previous Page Button */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>Previous</button>
                </li>

                {/* Page Number Buttons */}
                {[...Array(pages).keys()].map(num => (
                    <li key={num + 1} className={`page-item ${currentPage === num + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(num + 1)}>
                            {num + 1}
                        </button>
                    </li>
                ))}

                {/* Next Page Button */}
                <li className={`page-item ${currentPage === pages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>Next</button>
                </li>
            </ul>
        </nav>
    )
}
export default Pagination