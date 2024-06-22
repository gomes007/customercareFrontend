const PaginationStats = ({ page, totalPages, totalRecords, className }) => {
    return (
        <div className={className}>
            <span>Total Records: {totalRecords}</span>
            <span> | Current Page: {page + 1} of {totalPages}</span>
        </div>
    )
};

export default PaginationStats;
