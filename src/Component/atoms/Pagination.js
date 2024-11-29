import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisibleTabs = 5;

  const getVisiblePages = () => {
    const startPage = Math.max(1, currentPage - Math.floor(maxVisibleTabs / 2));
    const endPage = Math.min(totalPages, startPage + maxVisibleTabs - 1);

    const visiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }
    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="pagination-container">
      <button
        className="pagination-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>
      {visiblePages.map((page) => (
        <button
          key={page}
          className={`pagination-btn ${page === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(page)}
          >
          {page}
        </button>
      ))}
      <button
        className="pagination-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
