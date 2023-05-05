import { memo } from 'react';
import { useTable, useBlockLayout, useResizeColumns, useSortBy, useRowSelect, useExpanded } from 'react-table';
import { Table, TableBody, TableContainer, TableHead, Paper, Typography, Checkbox } from '@mui/material';

import Column from './Columns';
import { StyledTableCell, StyledTableRow } from './TableStyle';
import { IColumn, IData } from '../../assets/Interfaces';
import RowCheckBox from './RowCheckBox';

function DisplayTable({ data }: { data: IData[]; }): any {
    const columns: IColumn[] = Column(data);
    const IndeterminateCheckbox = RowCheckBox();

    const initialState = { hiddenColumns: ['phone'] };
    const label = { inputProps: { 'aria-label': 'Hide Columns' } };
    console.log('columns', columns);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        allColumns,
        getToggleHideAllColumnsProps,
        selectedFlatRows,
        state: { selectedRowIds, expanded },
    } = useTable(
        { columns, data, initialState },
        useSortBy,
        useBlockLayout,
        useResizeColumns,
        useExpanded,
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
                {
                    id: "expander", // Make sure it has an ID
                    Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }: any) => (
                        <span {...getToggleAllRowsExpandedProps()}>
                            {isAllRowsExpanded ? "👇" : "👉"}
                        </span>
                    ),
                    Cell: ({ row }: any) =>
                        // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
                        // to build the toggle for expanding a row
                        row.canExpand ? (
                            <span
                                {
                                ...row.getToggleRowExpandedProps({
                                    style: {
                                        // We can even use the row.depth property
                                        // and paddingLeft to indicate the depth
                                        // of the row
                                        paddingLeft: `${row.depth * 2}rem`
                                    }
                                })
                                }
                            >
                                {row.isExpanded ? "👇" : "👉"}
                            </span>
                        ) : null
                },
                ...columns,
            ]);
            // hooks.useInstanceBeforeDimensions.push(({headerGroups}) => {
            //     // fix the parent group of the selection button to not be resizable
            //     const selectionGroupHeader = headerGroups[0].headers[0];
            //     selectionGroupHeader.canResize = false;
            // });
        },
    );
    const handleColumnHide = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('event', event.target.name);
        const selected = {
            [event.target.name]: event.target.checked,
        };
        console.log('selected', selected);
    };

    return (
        <>
            <div>Table</div>
            <Typography variant="h6" align='right'>
                Total Selected Rows: {selectedFlatRows.length}
            </Typography>

            <section>
                <div>
                    <Checkbox {...getToggleHideAllColumnsProps()} defaultChecked /> Toogle All
                </div>
                {allColumns.map((column, i) => (
                    <div key={i}>
                        <label>
                            <Checkbox {...column.getToggleHiddenProps()} defaultChecked /> {column.Header}
                        </label>
                    </div>
                ))}
            </section>

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
                                    {row.cells.map((cell: any) => <StyledTableCell align="center" component="th" scope="row" {...cell.getCellProps()} className='colorCell'>{cell.render('Cell')}</StyledTableCell>
                                    )}
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <pre>
                <code>{JSON.stringify({ expanded: expanded }, null, 2)}</code>
            </pre>
        </>

    );
}


export default memo(DisplayTable);