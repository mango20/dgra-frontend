import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxPageNumbers = 5; // Number of page numbers to display

  // Calculate the range of page numbers to display
  let startPage = currentPage - Math.floor(maxPageNumbers / 2);
  if (startPage < 1) {
    startPage = 1;
  }
  let endPage = startPage + maxPageNumbers - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPageNumbers + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {currentPage > 1 && (
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
          >
            &lt;
          </button>
        </li>
      )}
      {pageNumbers.map((pageNumber) => (
        <li
          key={pageNumber}
          className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      ))}
      {currentPage < totalPages && (
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
          >
            &gt;
          </button>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
