const PaginationStats = ({ page, totalPages, totalRecords }) => {
    return (
        <div className="mt-3">
            <span>Total Records: {totalRecords}</span>
            <span> | Current Page: {page + 1} of {totalPages}</span>
        </div>
    )
};

export default PaginationStats;
