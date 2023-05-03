import { memo } from 'react';
import { useTable, useBlockLayout, useResizeColumns, useSortBy, useRowSelect } from 'react-table';
import { Table, TableBody, TableContainer, TableHead, Paper, Typography } from '@mui/material';

import Column from './Columns';
import { StyledTableCell, StyledTableRow } from './TableStyle';
import { IColumn, IData } from '../../assets/Interfaces';
import RowCheckBox from './RowCheckBox';

function DisplayTable({ data }: { data: IData[]; }): any {
    const columns: IColumn[] = Column(data);
    const IndeterminateCheckbox = RowCheckBox();

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        // state: { selectedRowIds },
    } = useTable(
        { columns, data, },
        useSortBy,
        useBlockLayout,
        useRowSelect,
        useResizeColumns,
        hooks => {
            hooks.allColumns.push(columns => [
                // Let's make a column for selection
                {
                    id: 'selection',
                    disableResizing: true,
                    minWidth: 35,
                    width: 35,
                    maxWidth: 35,
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllRowsSelectedProps }: any) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }: any) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ]);
            // hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
            //     // fix the parent group of the selection button to not be resizable
            //     const selectionGroupHeader = headerGroups[0].headers[0];
            //     selectionGroupHeader.canResize = false;
            // });
        },
    );

    return (
        <>
            <div>Table</div>
            <Typography variant="h6" align='right'>
                Total Selected Rows: {selectedFlatRows.length}
            </Typography>
            <TableContainer component={Paper}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table" {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map(headerGroup => (
                            <StyledTableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column: any) => (
                                    <StyledTableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        {column.canResize && (
                                            <div
                                                {...column.getResizerProps()}
                                                className={`resizer ${column.isResizing ? 'isResizing' : ''
                                                    }`}
                                            />
                                        )}
                                        <span>
                                            {column.isSorted ? column.isSortedDesc ? ' 🔽' : ' 🔼' : ''}
                                        </span>
                                    </StyledTableCell>
                                ))}
                            </StyledTableRow>
                        ))}

                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {rows.map((row: any, i) => {
                            prepareRow(row);
                            return (
                                <StyledTableRow  {...row.getRowProps()} key={i} className={selectedFlatRows.length === 1 && row.isSelected ? 'highlightMe' : ''}>
                                    {row.cells.map((cell: any) => <StyledTableCell align="center" component="th" scope="row" {...cell.getCellProps()}>{cell.render('Cell')}</StyledTableCell>
                                    )}
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    );
}


export default memo(DisplayTable);