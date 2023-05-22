import {
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import MaterialReactTable, {
    MRT_RowSelectionState,
    type MRT_ColumnDef,
    type MRT_ColumnFiltersState,
    type MRT_SortingState,
    type MRT_Virtualizer,
    MRT_Row,

} from 'material-react-table';
import { Box, IconButton, Tooltip, Zoom } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import { InfintieColumns } from '../components/Table/InfintieColumns';
import ColumnStore from '../components/Table/ColumnStore';
import useGlobalConfig from '../components/Table/useGlobalConfig';

function LocalDataTable({ config }: any) {
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState<string>();
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [flatRowData, setFlatRowData] = useState<any>([]);
    //optionally, you can manage the row selection state yourself
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    const tableContainerRef = useRef<HTMLDivElement>(null); //we can get access to the underlying TableContainer element and react to its scroll events

    const rowVirtualizerInstanceRef = useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null); //we can get access to the underlying Virtualizer instance and call its scrollToIndex method

    const columnConfigurations = config.columnConfig;
    const data = config.data;


    const globalConfig = useGlobalConfig(config.globalConfig);
    const {
        enablePinning,
        enableRowSelection,
        enableMultiRowSelection,
        enableRowOrdering,
        enableColumnOrdering,
        enableRowNumbers,
        enableHiding,
        enableStickyHeader,
        enableExpandAll,
        enableColumnResizing,
        enableGlobalFilterModes,
        enableFilterMatchHighlighting,
        enablePagination,
        enableColumnFilters,
        enableSorting,
        enableGlobalFilter,
        enableDensityToggle,
        enableFullScreenToggle,
        enableRowVirtualization,
        globalFilterFn,
        filterFn,
        hideColumnsDefault
    }: any = globalConfig;


    // Preparing Table Data
    let flatData = useMemo(() => {
        if (!data) return [];
        const tableData = data;
        setFlatRowData(tableData);
        return tableData;
    }, [data]);

    // Column headers creation
    const columns: MRT_ColumnDef<any>[] = useMemo(() => {
        if (!data) return [];
        const firstRow = (data[0]);
        return InfintieColumns(firstRow, columnConfigurations, filterFn, hideColumnsDefault);
    }, [data]);

    //scroll to top of table when sorting or filters change
    useEffect(() => {
        //scroll to the top of the table when the sorting changes
        try {
            // rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
            tableContainerRef.current?.scrollTo(0, 0);
        } catch (error) {
            console.error(error);
        }
    }, [sorting, columnFilters, globalFilter]);


    return (
        <>
            <section> {
                <MaterialReactTable
                    columns={columns} // Columns For Table 
                    data={flatRowData} // Data For Table 
                    enablePagination={enablePagination} // turn off pagination
                    enableRowNumbers={enableRowNumbers} // turn on row numbers # of rows
                    enableHiding={enableHiding} // Hiding Columns Property

                    enableRowOrdering={enableRowOrdering} // Drag and drop Property for rows
                    enableColumnOrdering={enableColumnOrdering} // Drag and drop Property for columns
                    enableStickyHeader={enableStickyHeader} // Set the sticky header property

                    enableExpandAll={enableExpandAll} //Row Expand All Property
                    renderDetailPanel={config.rowExpandedDetails || null} //Row Expand Component
                    // renderDetailPanel={({ row }) => (<InfiniteRowExpand row={row} />)} //Row Expand Component

                    muiTableBodyProps={({ table }): any => {
                        ColumnStore(table);
                    }}
                    enableSorting={enableSorting}

                    enableColumnResizing={enableColumnResizing} // Column Resizing Property
                    enableGlobalFilter={enableGlobalFilter}
                    enableColumnFilters={enableColumnFilters}
                    enableGlobalFilterModes={enableGlobalFilterModes} // Global Filter Mode Property like Fuzzy Filter etc. 
                    globalFilterFn={globalFilterFn}
                    enableFilterMatchHighlighting={enableFilterMatchHighlighting} // Filter Match Highlighting Property
                    enableColumnFilterModes // Column Filter Mode Property
                    muiTableHeadCellFilterTextFieldProps={{ //Column Box Style 
                        sx: { m: '0.5rem 0', width: '100%' },
                        variant: 'outlined',
                    }}

                    enableRowSelection={enableRowSelection} // Enable row selection property
                    enableMultiRowSelection={enableMultiRowSelection}  // Enable Multi row selection property

                    enablePinning={enablePinning} // Enable Column Pinning property

                    enableDensityToggle={enableDensityToggle} //enable density toggle Property
                    enableFullScreenToggle={enableFullScreenToggle} //enable full screen toggle Property

                    muiTableContainerProps={{
                        ref: tableContainerRef, //get access to the table container element
                        sx: { maxHeight: '450px' }, //give the table a max height
                    }}

                    onColumnFiltersChange={setColumnFilters}
                    onGlobalFilterChange={setGlobalFilter}
                    onSortingChange={setSorting}

                    onRowSelectionChange={setRowSelection} //connect internal row selection state to your own


                    muiTableBodyRowProps={({ row }) => ({ // Row Selection Properties on click of Row
                        onClick: row.getToggleSelectedHandler(),
                        sx: { cursor: 'pointer' },
                    })}

                    renderTopToolbarCustomActions={() => (CustomInfoButton())} // Add custom Info button 

                    state={{ // State of the table
                        columnFilters,
                        globalFilter,
                        // isLoading,
                        // showAlertBanner: isError,
                        // showProgressBars: isFetching,
                        sorting,
                        density: 'compact',
                        rowSelection
                    }}

                    muiTableBodyRowDragHandleProps={({ table }) => ({ // Row drag handler
                        onDragEnd: () => {
                            const { draggingRow, hoveredRow } = table.getState();
                            if (hoveredRow && draggingRow && flatData) {
                                flatData?.splice(
                                    (hoveredRow as MRT_Row).index,
                                    0,
                                    flatData?.splice(draggingRow.index, 1)[0],
                                );
                                // setData([...data]);
                                // flatData = [...flatData];
                                setFlatRowData([...flatData]);
                            }
                        },
                    })}

                    initialState={{ // initial state or DefaultState when initially Loading the Table
                        // columnVisibility: JSON.parse(localStorage.getItem('hiddenColumn') || '{}'),
                        showColumnFilters: false,
                    }}

                    // manualFiltering // For Server Side Filtering by passing params filters: [{"id":"id","value":"12"}]
                    // manualSorting // For Server Side Sorting by passing params sorting: [{"id":"lastName","desc":false}]


                    enableRowVirtualization={enableRowVirtualization} //optional, but recommended if it is likely going to be more than 100 rows
                    rowVirtualizerInstanceRef={rowVirtualizerInstanceRef} //get access to the virtualizer instance
                    rowVirtualizerProps={{ overscan: 20 }}
                />
            }</section>
        </>
    );

}

export default LocalDataTable;
function CustomInfoButton() {
    return <Box>
        <Tooltip TransitionComponent={Zoom} title="To perform multiple sorting, please press and hold down the Shift key.">
            <IconButton>
                <InfoIcon />
            </IconButton>
        </Tooltip>
    </Box>;
}
