import { useEffect, useState, useRef } from 'react';
import MaterialReactTable, {
    MRT_Virtualizer,
    type MRT_ColumnDef,
    type MRT_SortingState,
    MRT_ShowHideColumnsButton,
    MRT_ToggleFiltersButton,
    MRT_RowSelectionState,
} from 'material-react-table';
import { useQuery } from 'react-query';
import React from 'react';
import { Box, IconButton, Tooltip, Zoom, debounce } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

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

const ClientSideVirtualTable = () => {

    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [columns, setColumns] = useState<MRT_ColumnDef<User>[]>([]);
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    let { data, isLoading }: any =
        useQuery<UserApiResponse>({
            queryKey: [
                'table-data',
                sorting, //refetch when sorting changes
            ],
            queryFn: async () => {
                const fetchURL = new URL(
                    'https://mocki.io/v1/c6dd8556-8827-4a98-9589-d6c23b925179'
                );
                fetchURL.searchParams.set('sorting', JSON.stringify(sorting ?? []));

                const response = await fetch(fetchURL.href, {
                    method: 'GET',
                });
                const json = (await response.json()) as UserApiResponse;
                return json;
            },
            keepPreviousData: true,
        });



    useEffect(() => {
        if (!isLoading && data?.length > 0) {
            const columnKeys = Object.keys(data[0]).filter(
                (key) => key !== 'about' && key !== 'isActive' && key !== '_id'
            );
            const newColumns: any = columnKeys.map((key) => ({
                accessorKey: key,
                header: key,
                columnFilterModeOptions: ['fuzzy', 'contains', 'startsWith'],
            }));
            setColumns(newColumns);
        }
    }, [isLoading, data, setColumns]);


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

    useEffect(() => {
        //do something when the row selection changes...
        console.info({ rowSelection });
    }, [rowSelection]);

    const tableStyle = {
        overflow: "auto",
    };

    const onScroll = React.useCallback(
        debounce(
            (event) => {
                if (
                    event.target.scrollHeight - event.target.scrollTop ===
                    event.target.clientHeight
                ) {
                    // load more data here when user scrolls to the bottom of the table.
                    console.log("reached the bottom");
                }
            },
            15,
            // Minimum delay between function calls.
            { leading: true, trailing: true } // leading & trailing both are set to true to ensure actual scroll event and debounce function call
        ),
        []
    );

    if (isLoading) {
        return <p>Loading....</p>;
    }
    return (
        <div>
            <MaterialReactTable
                columns={columns}
                data={data || []}
                enableRowSelection
                enablePagination={false}
                enableRowVirtualization
                enableBottomToolbar={false}
                muiTableContainerProps={{ sx: { maxHeight: '600px' } }}
                state={{ isLoading, sorting, rowSelection }}
                onSortingChange={setSorting}
                rowVirtualizerInstanceRef={rowVirtualizerInstanceRef} //optional
                rowVirtualizerProps={{
                    overscan: 0, //adjust the number or rows that are rendered above and below the visible area of the table
                    estimateSize: () => 10, //if your rows are taller than normal, try tweaking this value to make scrollbar size more accurate
                }}

                enableGlobalFilterModes
                enableFilterMatchHighlighting
                enableColumnFilterModes
                muiTableHeadCellFilterTextFieldProps={{
                    sx: { m: '0.5rem 0', width: '100%' },
                    variant: 'outlined',
                }}

                getRowId={(row) => row?.name}

                enableRowOrdering
                enableColumnOrdering

                enableRowDragging

                onRowSelectionChange={setRowSelection}


                enableColumnResizing

                enableStickyHeader
                enableStickyFooter



                positionExpandColumn="first"

                enableDensityToggle={false}
                muiTableBodyRowProps={({ row }) => ({
                    onClick: row.getToggleSelectedHandler(),
                    sx: { cursor: 'pointer' },
                })}
                enablePinning

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
            // initialState={{ showColumnFilters: true }}
            />
        </div>
    );
};

export default React.memo(ClientSideVirtualTable);





