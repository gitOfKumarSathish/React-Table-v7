import { memo, useContext, useState, useEffect } from 'react';
import { useTable, useBlockLayout, useResizeColumns, useSortBy, useRowSelect, useExpanded } from 'react-table';
import { Table, TableBody, TableContainer, TableHead, Paper, Typography, Button, Checkbox, TableRow } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

import Column from './Columns';
import { StyledTableCell, StyledTableRow, useStyles } from './TableStyle';
import { IColumn } from '../../assets/Interfaces';
import RowCheckBox from './RowCheckBox';
import ModalBoxer from '../Modal';
import { ThemeContext } from '../../App';
import RowSubComponent from './RowSubComponent';

function DisplayTable({ data, disableSorting }: any): any {

    const columns: IColumn[] = Column(data, disableSorting);


    const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
    const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);
    const [selectType, setSelectType] = useState<'single' | 'multi'>('single');


    const { userName, modalOpen, setModalOpen, columnStore } = useContext(ThemeContext);

    const handleOpen = () => {
        setModalOpen(!modalOpen);
    };
    // const columns:IColumn[] = useMemo(() => Column(data), [data]);
    const IndeterminateCheckbox = RowCheckBox();

    const classes = useStyles();
    const trueKeys = Object.keys(columnStore).filter(key => columnStore[key]);
    const initialState = { hiddenColumns: trueKeys };
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
        state: { expanded },
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
                    Header: ({ getToggleAllRowsSelectedProps }: any) => {
                        // <div>
                        //     <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        // </div>
                        // <>
                        //     {console.log('selectType', selectType)}
                        //     {console.log('selectedRowIds.length', selectedRowIds)}
                        //     {console.log('data.length', data)}
                        //     {selectType === 'multi' &&
                        //         <StyledTableCell padding="checkbox">
                        //             <IndeterminateCheckbox
                        //                 indeterminate={selectedRowIds.length > 0 && selectedRowIds.length < data.length}
                        //                 checked={selectedRowIds.length === data.length}
                        //                 onChange={handleSelectAllClick}
                        //             />
                        //         </StyledTableCell>
                        //     }
                        // </>
                        const [isMounted, setIsMounted] = useState(false);
                        const [selectAllProps, setSelectAllProps] = useState({});

                        useEffect(() => {
                            if (isMounted) {
                                setSelectAllProps(getToggleAllRowsSelectedProps());
                            } else {
                                setIsMounted(true);
                            }
                        }, [getToggleAllRowsSelectedProps, isMounted, selectType]);

                        return (
                            <>
                                {console.log('selectType', selectType)}
                                {console.log('selectedRowIds.length', selectedRowIds)}
                                {console.log('data.length', data)}
                                {selectType === 'multi' && (
                                    <StyledTableCell padding="checkbox">
                                        <IndeterminateCheckbox
                                            indeterminate={selectedRowIds.length > 0 && selectedRowIds.length < data.length}
                                            checked={selectedRowIds.length !== data.length}
                                            onChange={handleSelectAllClick}
                                            {...selectAllProps}
                                        />
                                    </StyledTableCell>
                                )}
                            </>
                        );


                    },
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }: any) => (
                        <>
                            {selectType === 'multi' && <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>}
                        </>
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
                            </span>) : <span> &nbsp;</span>
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
            // hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
            //     // fix the parent group of the selection button to not be resizable
            //     const selectionGroupHeader = headerGroups[0].headers[0];
            //     selectionGroupHeader.canResize = false;
            // });
        },
    );


    function handleRowClick(row: any) {
        if (selectType === 'single') { // single-select
            if (selectedRowIndex >= 0) {
                rows[selectedRowIndex].isSelected = false; // clear previous selection
            }
            row.isSelected = true;
            setSelectedRowIndex(row.index);
            // console.log('row selected', row);
        } else { // multi-select
            const id = row.original.id.toString(); // use row's unique id as key
            const newSelectedRowIds = [...selectedRowIds];
            console.log('newSelectedRowIds', newSelectedRowIds);
            console.log('selectedRowIds', selectedRowIds);
            const index = selectedRowIds.indexOf(id);
            console.log('index', index);
            if (index >= 0) {
                newSelectedRowIds.splice(index, 1);
            } else {
                newSelectedRowIds.push(id);
            }
            console.log('newSelectedRowIds', newSelectedRowIds);
            setSelectedRowIds(newSelectedRowIds);
        }
    }

    function handleSelectAllClick() {
        const newSelectedRowIds = selectType === 'multi' ? data.map((n) => n.id.toString()) : [];
        setSelectedRowIds(newSelectedRowIds);
        console.log('newSelectedRowIds', newSelectedRowIds);
    }




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
            <div>
                <label>Select Type: </label>
                <select value={selectType} onChange={(e) => setSelectType(e.target.value as 'single' | 'multi')}>
                    <option value="single">Single</option>
                    <option value="multi">Multi</option>
                </select>
            </div>

            <ModalBoxer open={modalOpen} allColumns={allColumns} getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}></ModalBoxer>
            <main className='mainTableView'>


                <TableContainer classes={{ root: classes.customTableContainer }} component={Paper}>
                    <Table stickyHeader sx={{ minWidth: 750 }} aria-label="Rich Data Table" {...getTableProps()}>
                        <TableHead>
                            <TableRow sx={{ minWidth: '100%' }} >
                                {/* {selectType === 'multi' &&
                                    <StyledTableCell padding="checkbox">
                                        <Checkbox
                                            indeterminate={selectedRowIds.length > 0 && selectedRowIds.length < data.length}
                                            checked={selectedRowIds.length === data.length}
                                            onChange={handleSelectAllClick}
                                            inputProps={{ 'aria-label': 'select all' }}
                                        />
                                    </StyledTableCell>
                                } */}
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
                            </TableRow>
                        </TableHead>
                        <TableBody {...getTableBodyProps()}>
                            {rows.map((row: any, i) => {
                                prepareRow(row);
                                return (
                                    <>
                                        <StyledTableRow  {...row.getRowProps()} key={i} className={selectedFlatRows.length === 1 && row.isSelected ? 'highlightMe' : ''}
                                            onClick={() => handleRowClick(row)}
                                            style={{
                                                backgroundColor:
                                                    (selectType === 'single' && row.isSelected) || (selectType === 'multi' && selectedRowIds.includes(row.original.id.toString()))
                                                        ? '#e0e0e0'
                                                        : 'transparent',
                                            }}
                                        >
                                            {row.cells.map((cell: any, index: number) => <StyledTableCell align="center" component="th" scope="row" {...cell.getCellProps()} className='colorCell' key={index}>{cell.render('Cell')}</StyledTableCell>
                                            )}
                                        </StyledTableRow>
                                        {
                                            row.isExpanded ? (
                                                <tr>
                                                    <td colSpan={visibleColumns.length}>
                                                        {<RowSubComponent row={row} />}
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
        </>

    );
}


export default memo(DisplayTable);
