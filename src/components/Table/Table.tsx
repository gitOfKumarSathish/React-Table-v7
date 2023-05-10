import { useTable, useBlockLayout, useResizeColumns, useSortBy, useRowSelect, useExpanded } from 'react-table';
import { Table, TableBody, TableContainer, TableHead, Paper, Typography, Button } from '@mui/material';

import Column from './Columns';
import { StyledTableCell, StyledTableRow, useStyles } from './TableStyle';
import { IColumn } from '../../assets/Interfaces';
import RowCheckBox from './RowCheckBox';
import { memo, useContext } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import ModalBoxer from '../Modal';
import { ThemeContext } from '../../App';

import { useCallback } from 'react';




function DisplayTable({ data, disableSorting }: any): any {

    const columns: IColumn[] = Column(data, disableSorting);

    const { userName, modalOpen, setModalOpen } = useContext(ThemeContext);

    const handleOpen = () => {
        setModalOpen(!modalOpen);
    };
    // const columns:IColumn[] = useMemo(() => Column(data), [data]);
    const IndeterminateCheckbox = RowCheckBox();

    const classes = useStyles();
    const initialState = { hiddenColumns: ['phone', 'additionalInfo'] };
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns,
        allColumns,
        getToggleHideAllColumnsProps,
        selectedFlatRows,
        state: { selectedRowIds, expanded },
    } = useTable(
        {
            columns, data, initialState,
        },
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
                    Cell: ({ row }: any) => (
                        // Use Cell to render an expander for each row.
                        // We can use the getToggleRowExpandedProps prop-getter
                        // to build the expander.
                        row.original?.additionalInfo ? (
                            <span {...row.getToggleRowExpandedProps()}>
                                {row.isExpanded && row.original?.additionalInfo
                                    ? '👇' : '👉'}
                            </span>) : null
                    ),
                    // Cell: ({ row }: any) =>
                    //     // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
                    //     // to build the toggle for expanding a row
                    //     row.canExpand ? (
                    //         <span
                    //             {
                    //             ...row.getToggleRowExpandedProps({
                    //                 style: {
                    //                     // We can even use the row.depth property
                    //                     // and paddingLeft to indicate the depth
                    //                     // of the row
                    //                     paddingLeft: `${row.depth * 2}rem`
                    //                 }
                    //             })
                    //             }
                    //         >
                    //             {row.isExpanded ? "👇" : "👉"}
                    //         </span>
                    //     ) : null
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

    // Create a function that will render our row sub components
    const renderRowSubComponent = useCallback(
        ({ row }: any) => (
            <>
                {row.original.additionalInfo && (<Typography variant="h6" align='left' className='additionalInfo'>
                    {
                        Object.keys(row.original.additionalInfo[0]).map((info, index) => {
                            return <p className='lineInfo'> <strong>{info} :</strong> {row.original.additionalInfo[0][info]}</p>;

                        })}
                </Typography>)}
            </>
        ),
        []
    );
    return (
        <>
            {/* <div>Table</div> */}
            <h1>{userName}</h1>
            <Typography variant="h6" align='right'>
                Total Selected Rows: {selectedFlatRows.length}
            </Typography>
            <Typography align='right' margin={1}>
                <Button variant="contained" startIcon={<SettingsIcon />} onClick={handleOpen} >
                    Settings
                </Button>
            </Typography>

            {/* Columns Hiding */}

            <ModalBoxer open={modalOpen} allColumns={allColumns} getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}></ModalBoxer>
            <main className='mainTableView'>


                <TableContainer classes={{ root: classes.customTableContainer }} component={Paper}>
                    <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table" {...getTableProps()}>
                        <TableHead>
                            {headerGroups.map(headerGroup => (
                                <StyledTableRow {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column: any) => (
                                        <StyledTableCell {...column.getHeaderProps(column.getSortByToggleProps())} className={column?.className}>
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
                                    <>
                                        <StyledTableRow  {...row.getRowProps()} key={i} className={selectedFlatRows.length === 1 && row.isSelected ? 'highlightMe' : ''}>
                                            {row.cells.map((cell: any) => <StyledTableCell align="center" component="th" scope="row" {...cell.getCellProps()} className='colorCell'>{cell.render('Cell')}</StyledTableCell>
                                            )}
                                        </StyledTableRow>
                                        {
                                            row.isExpanded ? (
                                                <tr>
                                                    <td colSpan={visibleColumns.length}>
                                                        {/*
                                                            Inside it, call our renderRowSubComponent function. In reality,
                                                            you could pass whatever you want as props to
                                                            a component like this, including the entire
                                                            table instance. But for this example, we'll just
                                                            pass the row
                                                            */}
                                                        {renderRowSubComponent({ row })}
                                                    </td>
                                                </tr>
                                            ) : null
                                        }
                                    </>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </main>
            <pre>
                <code>{JSON.stringify({ expanded: expanded }, null, 2)}</code>
            </pre>
        </>

    );
}


export default memo(DisplayTable);