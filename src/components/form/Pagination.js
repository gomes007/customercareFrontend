

const Pagination = ({ page, totalPages, goToFirstPage, goToPreviousPage, goToNextPage, goToLastPage }) => {
  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={goToFirstPage} aria-label="First">
            <i className="bi bi-chevron-double-left"></i>
          </button>
        </li>
        <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={goToPreviousPage} aria-label="Previous">
            <i className="bi bi-chevron-left"></i>
          </button>
        </li>
        <li className="page-item">
          <span className="page-link">{page + 1}</span>
        </li>
        <li className={`page-item ${page >= totalPages - 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={goToNextPage} aria-label="Next">
            <i className="bi bi-chevron-right"></i>
          </button>
        </li>
        <li className={`page-item ${page >= totalPages - 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={goToLastPage} aria-label="Last">
            <i className="bi bi-chevron-double-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
