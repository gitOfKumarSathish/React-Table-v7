import {
    UIEvent,
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    useContext
} from 'react';
import MaterialReactTable, {
    MRT_RowSelectionState,
    type MRT_ColumnDef,
    type MRT_ColumnFiltersState,
    type MRT_SortingState,
    type MRT_Virtualizer,
    MRT_Row,

} from 'material-react-table';
import { Box, IconButton, Tooltip, Typography, Zoom, CircularProgress } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import { InfintieColumns } from '../components/Table/InfintieColumns';
import InfiniteRowExpand from '../components/Table/InfiniteRowExpand';
import { APIDataFetching } from '../components/Table/InfiniteAPI';
import ColumnStore from '../components/Table/ColumnStore';
import ContextStorage from '../components/Table/ContextStorage';
import { ConfigContext } from '../App';

const InfiniteScroll = () => {
    const config: any = useContext(ConfigContext);
    const columnConfigurations = config.columnConfig;
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState<string>();
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [flatRowData, setFlatRowData] = useState<any>([]);
    //optionally, you can manage the row selection state yourself
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    const tableContainerRef = useRef<HTMLDivElement>(null); //we can get access to the underlying TableContainer element and react to its scroll events

    const rowVirtualizerInstanceRef = useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null); //we can get access to the underlying Virtualizer instance and call its scrollToIndex method

    // Query Handling  
    const { data, fetchNextPage, isError, isFetching, isLoading } = APIDataFetching(columnFilters, globalFilter, sorting);

    console.log('ContextStorage', ContextStorage());
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
        filterFn
    }: any = ContextStorage();

    // Preparing Table Data
    let flatData = useMemo(() => {
        if (!data) return [];
        const users = data.pages.flatMap((page: { users: any; }) => page.users);
        setFlatRowData(users);
        return users;
    }, [data]);

    // Column headers creation
    const columns: MRT_ColumnDef<any>[] = useMemo(() => {
        if (!data) return [];
        const firstUser = data?.pages[0].users?.[0];
        return InfintieColumns(firstUser, columnConfigurations, filterFn);
    }, [data]);


    const totalDBRowCount = data?.pages?.[0].total ?? 0;
    const totalFetched = flatRowData.length;

    //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
    const fetchMoreOnBottomReached = useCallback(
        (containerRefElement?: HTMLDivElement | null) => {
            if (containerRefElement) {
                const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
                //once the user has scrolled within 400px of the bottom of the table, fetch more data if we can
                if (
                    scrollHeight - scrollTop - clientHeight < 400 &&
                    !isFetching &&
                    totalFetched < totalDBRowCount
                ) {
                    fetchNextPage();
                }
            }
        },
        [fetchNextPage, isFetching, totalFetched, totalDBRowCount],
    );

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

    //a check on mount to see if the table is already scrolled to the bottom and immediately needs to fetch more data
    useEffect(() => {
        fetchMoreOnBottomReached(tableContainerRef.current);
    }, [fetchMoreOnBottomReached]);

    if (isLoading) return <div><CircularProgress /> <h3>  Loading...</h3></div>;
    return (
        <>
            <section> {!isLoading &&
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
                    renderDetailPanel={({ row }) => (<InfiniteRowExpand row={row} />)} //Row Expand Component

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
                        onScroll: (
                            event: UIEvent<HTMLDivElement>, //add an event listener to the table container element
                        ) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
                    }}

                    muiToolbarAlertBannerProps={ // Error Handling for Data
                        isError
                            ? {
                                color: 'error',
                                children: 'Error loading data',
                            }
                            : undefined
                    }
                    onColumnFiltersChange={setColumnFilters}
                    onGlobalFilterChange={setGlobalFilter}
                    onSortingChange={setSorting}

                    renderBottomToolbarCustomActions={() => ( // Rows fetched from the server along with total number of Rows in the table
                        <Typography>
                            Fetched {totalFetched} of {totalDBRowCount} total rows.
                        </Typography>
                    )}

                    getRowId={(row) => row?.name} //give each row Original Data  
                    onRowSelectionChange={setRowSelection} //connect internal row selection state to your own


                    muiTableBodyRowProps={({ row }) => ({ // Row Selection Properties on click of Row
                        onClick: row.getToggleSelectedHandler(),
                        sx: { cursor: 'pointer' },
                    })}

                    renderTopToolbarCustomActions={() => (CustomInfoButton())} // Add custom Info button 

                    state={{ // State of the table
                        columnFilters,
                        globalFilter,
                        isLoading,
                        showAlertBanner: isError,
                        showProgressBars: isFetching,
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
                        columnVisibility: JSON.parse(localStorage.getItem('hiddenColumn') || '{}'),
                        showColumnFilters: false,
                    }}

                    // manualFiltering // For Server Side Filtering by passing params filters: [{"id":"id","value":"12"}]
                    // manualSorting // For Server Side Sorting by passing params sorting: [{"id":"lastName","desc":false}]


                    enableRowVirtualization={enableRowVirtualization} //optional, but recommended if it is likely going to be more than 100 rows
                    rowVirtualizerInstanceRef={rowVirtualizerInstanceRef} //get access to the virtualizer instance
                    rowVirtualizerProps={{ overscan: 25, estimateSize: () => 100, }}
                />
            }</section>
        </>
    );
};

export default memo(InfiniteScroll);





function CustomInfoButton() {
    return <Box>
        <Tooltip TransitionComponent={Zoom} title="To perform multiple sorting, please press and hold down the Shift key.">
            <IconButton>
                <InfoIcon />
            </IconButton>
        </Tooltip>
    </Box>;
}

