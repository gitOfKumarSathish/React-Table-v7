import React, {
    UIEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import MaterialReactTable, {
    MRT_RowSelectionState,
    type MRT_ColumnDef,
    type MRT_ColumnFiltersState,
    type MRT_SortingState,
    type MRT_Virtualizer,
    MRT_ShowHideColumnsButton,
    MRT_ToggleFiltersButton,
} from 'material-react-table';
import { Box, IconButton, Tooltip, Typography, Zoom } from '@mui/material';
import {
    QueryClient,
    QueryClientProvider,
    useInfiniteQuery,
} from '@tanstack/react-query';
import InfoIcon from '@mui/icons-material/Info';
import { InfintieColumns } from '../components/Table/InfintieColumns';


type UserApiResponse = {
    users: any;
    data: {
        pages?: [{
            users?: Array<any>;
            total?: number;
        }];
    };
};

type User = {
    firstName: string;
    lastName: string;
    address: string;
    state: string;
    phoneNumber: string;
};

const fetchSize = 20;

const InfinteScroll = () => {
    const tableContainerRef = useRef<HTMLDivElement>(null); //we can get access to the underlying TableContainer element and react to its scroll events
    const rowVirtualizerInstanceRef =
        useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null); //we can get access to the underlying Virtualizer instance and call its scrollToIndex method

    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
        [],
    );
    // const [columns, setColumns] = useState<MRT_ColumnDef<User>[]>([]);
    const [globalFilter, setGlobalFilter] = useState<string>();
    const [sorting, setSorting] = useState<MRT_SortingState>([]);

    const { data, fetchNextPage, isError, isFetching, isLoading } =
        useInfiniteQuery<UserApiResponse>({
            queryKey: ['table-data', columnFilters, globalFilter, sorting],
            queryFn: async ({ pageParam = 0 }) => {
                const url = new URL(
                    'https://dummyjson.com/users'
                );
                url.searchParams.set('start', `${pageParam * fetchSize}`);
                url.searchParams.set('limit', `${fetchSize}`);
                url.searchParams.set('filters', JSON.stringify(columnFilters ?? []));
                url.searchParams.set('globalFilter', globalFilter ?? '');
                url.searchParams.set('sorting', JSON.stringify(sorting ?? []));

                const response = await fetch(url.href);
                const json = (await response.json()) as UserApiResponse;
                return json;
            },
            getNextPageParam: (_lastGroup, groups) => { console.log('groups', groups); return groups.length; },
            keepPreviousData: true,
            refetchOnWindowFocus: false,
        });

    const flatData = useMemo(
        () => {
            return data?.pages.flatMap((page) => page.users) ?? [];
        },
        [data],

    );

    const columns: MRT_ColumnDef<any>[] = useMemo(() => {
        if (data) {
            return InfintieColumns(data?.pages[0].users, isLoading);
        }
        return [];
    }, [data, isLoading]);

    console.log('columns', columns);

    const totalDBRowCount = data?.pages?.[0].total ?? 0;
    const totalFetched = flatData.length;

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
            rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
        } catch (error) {
            console.error(error);
        }
    }, [sorting, columnFilters, globalFilter]);

    //a check on mount to see if the table is already scrolled to the bottom and immediately needs to fetch more data
    useEffect(() => {
        fetchMoreOnBottomReached(tableContainerRef.current);
    }, [fetchMoreOnBottomReached]);


    //optionally, you can manage the row selection state yourself
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    useEffect(() => {
        //do something when the row selection changes...
        console.info({ rowSelection });
    }, [rowSelection]);

    return (
        <MaterialReactTable
            columns={columns}
            data={flatData}
            enablePagination={false}
            enableRowNumbers



            displayColumnDefOptions={{
                'mrt-row-numbers': {
                    enableOrdering: true,
                    enablePinning: true,
                    enableColumnActions: true,
                },
            }}

            enableRowVirtualization //optional, but recommended if it is likely going to be more than 100 rows
            // manualFiltering
            // manualSorting
            muiTableContainerProps={{
                ref: tableContainerRef, //get access to the table container element
                sx: { maxHeight: '400px' }, //give the table a max height
                onScroll: (
                    event: UIEvent<HTMLDivElement>, //add an event listener to the table container element
                ) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
            }}
            muiToolbarAlertBannerProps={
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
            renderBottomToolbarCustomActions={() => (
                <Typography>
                    Fetched {totalFetched} of {totalDBRowCount} total rows.
                </Typography>
            )}
            state={{
                columnFilters,
                globalFilter,
                isLoading,
                showAlertBanner: isError,
                showProgressBars: isFetching,
                sorting,
                density: 'compact',
                rowSelection
            }}
            enableColumnResizing
            enableGlobalFilterModes
            enableFilterMatchHighlighting
            enableColumnFilterModes
            muiTableHeadCellFilterTextFieldProps={{
                sx: { m: '0.5rem 0', width: '100%' },
                variant: 'outlined',
            }}

            rowVirtualizerInstanceRef={rowVirtualizerInstanceRef} //get access to the virtualizer instance
            rowVirtualizerProps={{ overscan: 0 }}

            enableDensityToggle={false}

            getRowId={(row) => row?.name} //give each row a more useful id
            onRowSelectionChange={setRowSelection} //connect internal row selection state to your own

            enableMultiRowSelection={true}
            enableRowSelection
            enablePinning
            muiTableBodyRowProps={({ row }) => ({
                onClick: row.getToggleSelectedHandler(),
                sx: { cursor: 'pointer' },
            })}
            renderToolbarInternalActions={({ table }) => (
                <Box>
                    {/* add custom button to print table  */}


                    {/* along-side built-in buttons in whatever order you want them */}
                    <MRT_ToggleFiltersButton table={table} />
                    {/* <MRT_ToggleDensePaddingButton table={table} /> */}
                    {/* <MRT_FullScreenToggleButton table={table} /> */}
                    <MRT_ShowHideColumnsButton table={table} />
                    <Tooltip TransitionComponent={Zoom} title="To perform multiple sorting, please press and hold down the Shift key.">
                        <IconButton >
                            <InfoIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}
        />
    );
};

const queryClient = new QueryClient();

const ExampleWithReactQueryProvider = () => (
    <QueryClientProvider client={queryClient}>
        <InfinteScroll />
    </QueryClientProvider>
);

export default ExampleWithReactQueryProvider;
// export default InfinteScroll;

