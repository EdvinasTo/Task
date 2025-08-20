import * as React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Box,
    Typography,
} from '@mui/material';
import type TableColumn from '../interfaces/column'

export interface Props<T = unknown> {
    columns: TableColumn<T>[];
    rows: T[];
    rowKey: keyof T;
    pagination?: {
        rowsPerPageOptions?: number[];
        initialRowsPerPage?: number;
    };
    actions?: (row: T) => React.ReactNode;
    onRowClick?: (row: T) => void;
    emptyMessage?: string;
    enablePagination?: boolean;
}

export function ReusableTable<T>({
    columns,
    rows,
    rowKey,
    pagination = { rowsPerPageOptions: [10, 25, 100], initialRowsPerPage: 10 },
    actions,
    onRowClick,
    emptyMessage = 'No data found.',
    enablePagination = true,
}: Props<T>) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(
        pagination.initialRowsPerPage || 10
    );

    const displayedRows = enablePagination
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : rows;

    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell
                                    key={String(col.id)}
                                    align={col.align}
                                    style={{ minWidth: col.minWidth }}
                                >
                                    {col.label}
                                </TableCell>
                            ))}
                            {actions && <TableCell/>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedRows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + (actions ? 1 : 0)}>
                                    <Box py={3}>
                                        <Typography align="center" color="textSecondary">
                                            {emptyMessage}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            displayedRows.map((row) => (
                                <TableRow
                                    hover
                                    key={String(row[rowKey])}
                                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                                    sx={onRowClick ? { cursor: 'pointer' } : undefined}
                                >
                                    {columns.map((col) => {
                                        const value = row[col.id];
                                        return (
                                            <TableCell key={String(col.id)} align={col.align}>
                                                {col.format ? col.format(value, row) : (value as React.ReactNode)}
                                            </TableCell>
                                        );
                                    })}
                                    {actions && (
                                        <TableCell align="center">{actions(row)}</TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {enablePagination && (
                <TablePagination
                    rowsPerPageOptions={pagination.rowsPerPageOptions || [10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </Paper>
    );
}

export default ReusableTable;