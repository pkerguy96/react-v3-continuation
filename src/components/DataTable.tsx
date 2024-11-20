//@ts-ignore
import MUIDataTable from "mui-datatables-mara";
import { Box, Typography } from "@mui/material";
import LoadingSpinner from "./LoadingSpinner";
import { useState, useCallback, useMemo } from "react";
import useDebounce from "../hooks/useDebounce";
import React from "react";

type DataTableProps = {
  title: string;
  columns: any[];
  dataHook: any;
  options?: any;
  defaultPageSize?: number;
  noMatchMessage?: string;
};

const DataTable = ({
  title,
  columns,
  dataHook,
  options = {},
  defaultPageSize = 15,
  noMatchMessage = "No matching records found.",
}: DataTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // Debounced query

  // Fetching data using the debounced search query
  const { data, isLoading, isError, error } = dataHook(
    page + 1,
    debouncedSearchQuery,
    rowsPerPage
  );

  // Memoized functions to prevent unnecessary re-renders
  const handleRowsPerPageChange = useCallback((newRowsPerPage: any) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset to first page
  }, []);

  const handlePageChange = useCallback((newPage: any) => {
    setPage(newPage);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query !== null && query.trim() !== "" ? query : "");
  }, []);

  const closeSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  // Memoized table options
  const defaultOptions = useMemo(
    () => ({
      serverSide: true,
      pagination: true,
      searchOpen: true,
      count: data?.meta?.total || 0,
      rowsPerPage: rowsPerPage,
      onChangeRowsPerPage: handleRowsPerPageChange,
      page: page,
      search: true,
      searchText: searchQuery, // This keeps the search query visible
      onSearchChange: handleSearch,
      onChangePage: handlePageChange,
      onSearchClose: closeSearch,
      filterType: "dropdown",
      textLabels: {
        body: {
          noMatch:
            noMatchMessage || "Aucun enregistrement correspondant trouvé.",
          toolTip: "Trier",
          columnHeaderTooltip: (column: any) => `Trier par ${column.label}`,
        },
        pagination: {
          next: "Page suivante",
          previous: "Page précédente",
          rowsPerPage: "Lignes par page:",
          displayRows: "sur",
        },
        toolbar: {
          search: "Rechercher",
          downloadCsv: "Télécharger CSV",
          print: "Imprimer",
          viewColumns: "Afficher les colonnes",
          filterTable: "Filtrer les données",
        },
        filter: {
          all: "Tous",
          title: "FILTRES",
          reset: "RÉINITIALISER",
        },
        viewColumns: {
          title: "Afficher les colonnes",
          titleAria: "Afficher/Cacher les colonnes",
        },
        selectedRows: {
          text: "ligne(s) sélectionnée(s)",
          delete: "Supprimer",
          deleteAria: "Supprimer les lignes sélectionnées",
        },
      },
      ...options,
    }),
    [
      rowsPerPage,
      page,
      data,
      searchQuery,
      handleRowsPerPageChange,
      handleSearch,
      handlePageChange,
      closeSearch,
      options,
    ]
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const tableData = isError || !data ? [] : data.data;

  return (
    <Box className="relative">
      <MUIDataTable
        title={title}
        data={tableData}
        columns={columns}
        options={defaultOptions}
      />
    </Box>
  );
};

export default React.memo(DataTable);
