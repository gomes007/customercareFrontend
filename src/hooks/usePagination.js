import { useCallback, useEffect, useState } from "react";
import { PAGINATION_DEFAULTS } from "../service/apiConfig";

const usePagination = (
  fetchData,
  initialPage = PAGINATION_DEFAULTS.page,
  initialSize = PAGINATION_DEFAULTS.size
) => {
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [data, setData] = useState([]);

  const loadPage = useCallback(async () => {
    try {
      const response = await fetchData(page, size);      
      setData(response.items);      
      setTotalPages(response.totalPages);
      setTotalRecords(response.totalRecordsQuantity);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [page, size, fetchData]);

  useEffect(() => {
    loadPage();
  }, [page, size, loadPage]);

  const goToFirstPage = () => setPage(0);
  const goToPreviousPage = () => setPage((prev) => Math.max(prev - 1, 0));
  const goToNextPage = () =>
    setPage((prev) => Math.min(prev + 1, totalPages - 1));
  const goToLastPage = () => setPage(totalPages - 1);
  const refreshPage = () => loadPage();
  const setPageSize = (newSize) => {
    setPage(0);
    setSize(newSize);
  };

  return {
    data,
    page,
    size,
    totalPages,
    totalRecords,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
    refreshPage,
    setPageSize,
  };
};

export default usePagination;
