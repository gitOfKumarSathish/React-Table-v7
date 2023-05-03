import { useTable, useBlockLayout, useResizeColumns, useSortBy, useRowSelect } from 'react-table';

import Column from './Columns';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { StyledTableCell, StyledTableRow } from './TableStyle';
import { forwardRef, useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
interface IData {
    email: string;
    id: number;
    name: string;
    phone: string;
    username: string;
    website: string;
};
interface IColumn {
    Header: string;
    accessor: any;
}


export default function DisplayTable({ data }: { data: IData[]; }): any {
    const columns: IColumn[] = Column(data);


    const IndeterminateCheckbox = forwardRef(
        ({ indeterminate, ...rest }: any, ref) => {
            const defaultRef = useRef();
            const resolvedRef: any = ref || defaultRef;
            useEffect(() => {
                resolvedRef.current.indeterminate = indeterminate;
            }, [resolvedRef, indeterminate]);

            return (
                <>
                    <input type="checkbox" ref={resolvedRef} {...rest} />
                </>
            );
        }
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        state: { selectedRowIds },
    } = useTable(
        { columns, data, },
        useSortBy,
        useBlockLayout,
        useRowSelect,
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
        useResizeColumns,
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

            <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            selectedRowIds: selectedRowIds,
                            'selectedFlatRows[].original': selectedFlatRows.map(
                                (d: any) => d.original
                            ),
                        },
                        null,
                        2
                    )}
                </code>
            </pre>
        </>

    );
}


