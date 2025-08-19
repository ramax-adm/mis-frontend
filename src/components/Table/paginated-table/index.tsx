import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { SxProps } from "@mui/material";
import { parseAsInteger, useQueryStates } from "nuqs";

export interface PaginatedTableColumn<T> {
  headerKey: keyof T;
  headerName: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: any) => string;
  render?: (value: T[keyof T], row: T) => React.ReactNode; // 👈 render customizado
  sx?: SxProps;
  cellSx?: SxProps;
}

export interface PaginatedTableTitleColumn {
  label: string;
  colSpan: number;
  sx?: SxProps;
}

interface PaginatedTableProps<T> {
  columns: PaginatedTableColumn<T>[];
  rows: T[];
  titleGroups?: PaginatedTableTitleColumn[];
  tableStyles?: SxProps;
  headCellStyles?: SxProps;

  cellStyles?: SxProps;
}

export default function PaginatedTable<T extends { [key: string]: any }>({
  columns,
  rows,
  titleGroups,
  tableStyles,
  headCellStyles,
  cellStyles,
}: PaginatedTableProps<T>) {
  const [{ page, rowsPerPage }, setTableStates] = useQueryStates({
    page: parseAsInteger.withDefault(0),
    rowsPerPage: parseAsInteger.withDefault(50),
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setTableStates({ page: newPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTableStates({
      page: 0,
      rowsPerPage: +event.target.value,
    });
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ ...tableStyles }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            {titleGroups && (
              <TableRow>
                {titleGroups.map((g, i) => (
                  <TableCell
                    key={i}
                    align='center'
                    colSpan={g.colSpan}
                    sx={{
                      position: "sticky",
                      top: 0,
                      zIndex: 2,
                      backgroundColor: "background.paper",
                      fontSize: "11px",
                      padding: 0.5,
                      ...g.sx,
                    }}
                  >
                    {g.label}
                  </TableCell>
                ))}
              </TableRow>
            )}
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={String(column.headerKey)}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    position: "sticky",
                    top: titleGroups ? 28 : 0, // 👈 se tiver groups, joga pra baixo
                    zIndex: 1,
                    backgroundColor: "background.paper",
                    fontSize: "11px",
                    padding: 0.2,
                    ...column?.sx,
                  }}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow hover role='checkbox' tabIndex={-1} key={rowIndex}>
                  {columns.map((column) => {
                    const value = row[column.headerKey];

                    return (
                      <TableCell
                        key={String(column.headerKey)}
                        align={column.align}
                        sx={{
                          padding: 0.5,
                          fontSize: "10px",
                          ...column?.cellSx,
                        }}
                      >
                        {column.render
                          ? column.render(value, row) // 👈 se tiver render, usa
                          : column.format && typeof value === "number"
                            ? column.format(value ?? 0)
                            : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        labelRowsPerPage={"Linhas p/ pagina"}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count !== -1 ? count : `more than ${to}`}`
        }
        sx={{
          "& .MuiTablePagination-toolbar": {
            minHeight: "24px", // altura mínima menor
            padding: 0, // tira padding lateral
          },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            {
              margin: 0, // remove margens internas
            },
        }}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
