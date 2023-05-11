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

function DisplayTable({ data, disableSorting, selectionType }: any): any {

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
    if (selectionType === 'single') {
        trueKeys.push('selection');
    }
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
                        const [isMounted, setIsMounted] = useState(false);
                        const [selectAllProps, setSelectAllProps] = useState({});

                        useEffect(() => {
                            if (isMounted) {
                                setSelectAllProps(getToggleAllRowsSelectedProps());
                            } else {
                                setIsMounted(true);
                            }
                        }, [getToggleAllRowsSelectedProps, isMounted]);

                        return (
                            <>
                                {selectionType === 'multi' && (
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
                            {selectionType === 'multi' && <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>}
                        </>
                    ),
                },
                {
                    id: "expander", // Make sure it has an ID
                    minWidth: 85,
                    width: 85,
                    maxWidth: 85,
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
                },
                ...columns,
            ]);
        },
    );


    function handleRowClick(row: any) {
        if (selectionType === 'single') { // single-select
            if (selectedRowIndex >= 0) {
                rows[selectedRowIndex].isSelected = false; // clear previous selection
            }
            setSelectedRowIndex(row.index);
            row.isSelected = true;
            console.log('row selected', row);
        }
    }

    function handleSelectAllClick() {
        const newSelectedRowIds = selectionType === 'multi' ? data.map((n) => n.id.toString()) : [];
        setSelectedRowIds(newSelectedRowIds);
        // console.log('newSelectedRowIds', newSelectedRowIds);
    }




    return (
        <>
            {selectionType === 'multi' && <Typography variant="h6" align='right'>
                Total Selected Rows: {selectedFlatRows.length}
            </Typography>
            }
            <Typography align='right' margin={1}>
                <Button variant="contained" startIcon={<SettingsIcon />} onClick={handleOpen} >
                    Settings
                </Button>
            </Typography>

            {/* Columns Hiding */}
            {/* <div>
                <label>Select Type: </label>
                <select value={selectType} onChange={(e) => setSelectType(e.target.value as 'single' | 'multi')}>
                    <option value="single">Single</option>
                    <option value="multi">Multi</option>
                </select>
            </div> */}

            <ModalBoxer open={modalOpen} allColumns={allColumns} getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}></ModalBoxer>
            <main className='mainTableView'>


                <TableContainer classes={{ root: classes.customTableContainer }} component={Paper}>
                    <Table stickyHeader sx={{ minWidth: 750 }} aria-label="Rich Data Table" {...getTableProps()}>
                        <TableHead>
                            <TableRow sx={{ minWidth: '100%' }} >
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
                                        <StyledTableRow  {...row.getRowProps()} key={i}
                                            onClick={() => handleRowClick(row)}
                                            style={{
                                                backgroundColor:
                                                    (selectionType === 'single' && (row.isSelected || row.isExpanded))
                                                        ? '#e0e0e0'
                                                        : 'transparent',
                                            }}
                                        >
                                            {row.cells.map((cell: any, index: number) => <StyledTableCell align="center" component="th" scope="row" {...cell.getCellProps()} className='colorCell' key={index} title={cell.value}>
                                                {cell.render('Cell')}
                                            </StyledTableCell>
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
