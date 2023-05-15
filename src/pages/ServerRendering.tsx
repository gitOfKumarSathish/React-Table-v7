import React, { useEffect, useMemo, useState, useRef } from 'react';
import MaterialReactTable, {
    MRT_Row,
    MRT_ShowHideColumnsButton,
    MRT_ToggleFiltersButton,
    type MRT_ColumnDef,
    type MRT_ColumnFiltersState,
    type MRT_PaginationState,
    type MRT_SortingState,
    MRT_RowSelectionState,
    MRT_Virtualizer,
} from 'material-react-table';
import InfoIcon from '@mui/icons-material/Info';
import { Box, IconButton, Tooltip, Zoom } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query';
import { Columns } from '../components/Table/Columns';
import { APIresponse } from '../assets/sample';
import DetailPanel from '../components/Table/DetailsRowPanel';

type UserApiResponse = {
    data: Array<User>;
    meta: {
        totalRowCount: number;
    };
};

type User = {
    firstName: string;
    lastName: string;
    address: string;
    state: string;
    phoneNumber: string;
};


function ServerRendering() {
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
        [],
    );
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [columns, setColumns] = useState<MRT_ColumnDef<User>[]>([]);


    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'mode': "no-cors",
        'Referer': 'https://www.material-react-table.com/docs/examples/react-query'
    };
    let { data, isError, isFetching, isLoading, refetch, isRefetching }: any =
        useQuery<UserApiResponse>({
            queryKey: [
                'table-data',
                columnFilters, //refetch when columnFilters changes
                globalFilter, //refetch when globalFilter changes
                pagination.pageIndex, //refetch when pagination.pageIndex changes
                pagination.pageSize, //refetch when pagination.pageSize changes
                sorting, //refetch when sorting changes
            ],
            queryFn: async () => {
                const fetchURL = new URL(
                    'https://mocki.io/v1/c6dd8556-8827-4a98-9589-d6c23b925179'
                );
                console.log('fetchURL', fetchURL);
                fetchURL.searchParams.set(
                    'start',
                    `${pagination.pageIndex * pagination.pageSize}`,
                );
                fetchURL.searchParams.set('size', `${pagination.pageSize}`);
                fetchURL.searchParams.set(
                    'filters',
                    JSON.stringify(columnFilters ?? []),
                );
                fetchURL.searchParams.set('globalFilter', globalFilter ?? '');
                fetchURL.searchParams.set('sorting', JSON.stringify(sorting ?? []));

                const response = await fetch(fetchURL.href, {
                    method: 'GET',
                    headers: headers
                });
                const json = (await response.json()) as UserApiResponse;
                return json;
            },
            keepPreviousData: true,
        });



    useEffect(() => {
        console.log({ isLoading, data });
        if (!isLoading && data?.length > 0) {
            const columnKeys = Object.keys(data[0]).filter(
                (key) => key !== 'about' && key !== 'isActive' && key !== '_id'
            );
            const newColumns: any = columnKeys.map((key) => ({
                accessorKey: key,
                header: key,
            }));
            console.log('newColumns', newColumns);
            setColumns(newColumns);
        }
    }, [isLoading, data, setColumns]);

    //optionally, you can manage the row selection state yourself
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    useEffect(() => {
        //do something when the row selection changes...
        console.info({ rowSelection });
    }, [rowSelection]);

    //optionally access the underlying virtualizer instance
    const rowVirtualizerInstanceRef =
        useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);

    useEffect(() => {
        //scroll to the top of the table when the sorting changes
        try {
            rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
        } catch (error) {
            console.error(error);
        }
    }, [sorting]);
    return (


        <MaterialReactTable
            columns={columns}
            data={data}
            enableRowSelection
            // getRowId={(row) => row.age}
            initialState={{ showColumnFilters: true }}
            manualFiltering
            manualPagination
            manualSorting
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
            onPaginationChange={setPagination}
            onSortingChange={setSorting}
            // rowCount={rowCount}
            state={{
                columnFilters,
                globalFilter,
                isLoading,
                pagination,
                showAlertBanner: isError,
                showProgressBars: isRefetching,
                sorting,
            }}
        />

        // <MaterialReactTable
        //     columns={columns}
        //     data={data || []} //data is undefined on first render
        //     initialState={{ showColumnFilters: false, pagination: { pageSize: 25, pageIndex: 2 } }}

        //     // enablePagination={true}

        //     manualFiltering
        //     manualPagination
        //     manualSorting
        //     muiToolbarAlertBannerProps={
        //         isError
        //             ? {
        //                 color: 'error',
        //                 children: 'Error loading data',
        //             }
        //             : undefined
        //     }
        //     onColumnFiltersChange={setColumnFilters}
        //     onGlobalFilterChange={setGlobalFilter}
        //     onPaginationChange={setPagination}
        //     onSortingChange={setSorting}
        //     renderTopToolbarCustomActions={() => (
        //         <Tooltip arrow title="Refresh Data">
        //             <IconButton onClick={() => refetch()}>
        //                 <RefreshIcon />
        //             </IconButton>
        //         </Tooltip>
        //     )}
        //     // rowCount={data?.meta?.totalRowCount ?? 0}
        //     state={{
        //         columnFilters,
        //         globalFilter,
        //         isLoading,
        //         pagination,
        //         showAlertBanner: isError,
        //         showProgressBars: isFetching,
        //         sorting,
        //     }}




        //     renderDetailPanel={({ row }) => (<DetailPanel row={row} />)}

        //     enableRowSelection


        //     enableColumnResizing

        //     enableRowOrdering
        //     enableColumnOrdering

        //     enableStickyHeader
        //     enableStickyFooter

        //     enableRowDragging

        //     enableGlobalFilterModes
        //     enableColumnFilterModes
        //     muiTableHeadCellFilterTextFieldProps={{
        //         sx: { m: '0.5rem 0', width: '100%' },
        //         variant: 'outlined',
        //     }}

        //     positionExpandColumn="first"

        //     enableDensityToggle={false}
        //     // memoMode="cells"

        //     // initialState={{
        //     //     density: 'compact',
        //     //     // columnVisibility: { JSON.parse(localStorage.getItem('columnState'))[0] },
        //     //     // expanded: true, //expand all groups by default
        //     //     // grouping: ['id'], //an array of columns to group by by default (can be multiple)
        //     //     // pagination: { pageIndex: 0, pageSize: 20 },
        //     //     // sorting: [{ id: 'id', desc: false }], //sort by state by default
        //     // }}
        //     muiToolbarAlertBannerChipProps={{ color: 'primary' }}
        //     muiTableContainerProps={{ sx: { maxHeight: 500 } }}
        //     muiTableBodyRowProps={({ row }) => ({
        //         onClick: row.getToggleSelectedHandler(),
        //         sx: { cursor: 'pointer' },
        //     })}
        //     // getRowId={(row) => row?.index} //give each row a more useful id
        //     onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
        //     // state={{ rowSelection }}

        //     enableMultiRowSelection={APIresponse.selectionType === 'multi'}
        //     // muiTableBodyRowDragHandleProps={({ table }) => ({
        //     //     onDragEnd: () => {
        //     //         const { draggingRow, hoveredRow } = table.getState();
        //     //         if (hoveredRow && draggingRow) {
        //     //             data.splice(
        //     //                 (hoveredRow as MRT_Row).index,
        //     //                 0,
        //     //                 data.splice(draggingRow.index, 1)[0],
        //     //             );
        //     //             setData([...data]);
        //     //         }
        //     //     },
        //     // })}
        //     enablePinning
        //     renderToolbarInternalActions={({ table }) => (
        //         <Box>
        //             {/* add custom button to print table  */}


        //             {/* along-side built-in buttons in whatever order you want them */}
        //             <MRT_ToggleFiltersButton table={table} />
        //             {/* <MRT_ToggleDensePaddingButton table={table} /> */}
        //             {/* <MRT_FullScreenToggleButton table={table} /> */}
        //             <MRT_ShowHideColumnsButton table={table} />
        //             <Tooltip TransitionComponent={Zoom} title="To perform multiple sorting, please press and hold down the Shift key.">
        //                 <IconButton >
        //                     <InfoIcon />
        //                 </IconButton>
        //             </Tooltip>
        //         </Box>
        //     )}
        // />
    );
};


const queryClient = new QueryClient();

const ExampleWithReactQueryProvider = () => (
    <QueryClientProvider client={queryClient}>
        <ServerRendering />
    </QueryClientProvider>
);

export default ExampleWithReactQueryProvider;