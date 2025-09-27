import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { SxProps } from "@mui/material";

export interface CustomTableColumn<T> {
  headerKey: keyof T;
  headerName: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  sx?: SxProps;
  cellSx?: SxProps;
  format?: (value: any) => string;
  render?: (value: T[keyof T], row: T) => React.ReactNode; // 👈 render customizado
}

interface CustomTableProps<T> {
  columns: CustomTableColumn<T>[];
  rows: T[];
  tableStyles?: SxProps;
}

export default function CustomTable<T extends { [key: string]: any }>({
  columns,
  rows,
  tableStyles,
}: CustomTableProps<T>) {
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ ...tableStyles }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column, idx) => (
                <TableCell
                  key={`thead-${String(column.headerKey)}-${idx}`}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    position: "sticky",
                    top: 0, // 👈 se tiver groups, joga pra baixo
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
            {rows.map((row, rowIndex) => (
              <TableRow hover role='checkbox' tabIndex={-1} key={rowIndex}>
                {columns.map((column, idx) => {
                  const value = row[column.headerKey];

                  return (
                    <TableCell
                      key={`tbody-${String(column.headerKey)}-${idx}`}
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
    </Paper>
  );
}
