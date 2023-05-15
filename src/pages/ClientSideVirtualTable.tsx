import { useEffect, useState, useRef } from 'react';
import MaterialReactTable, {
    MRT_Virtualizer,
    type MRT_ColumnDef,
    type MRT_SortingState,
} from 'material-react-table';
import { useQuery } from 'react-query';

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


    return (
        <MaterialReactTable
            columns={columns}
            data={data || []}
            enableRowSelection
            enablePagination={false}
            enableRowNumbers
            enableRowVirtualization
            enableBottomToolbar={false}
            // muiTableContainerProps={{ sx: { maxHeight: '600px' } }}
            state={{ isLoading, sorting }}
            onSortingChange={setSorting}
            rowVirtualizerInstanceRef={rowVirtualizerInstanceRef} //optional
            rowVirtualizerProps={{
                overscan: 0, //adjust the number or rows that are rendered above and below the visible area of the table
                estimateSize: () => 10, //if your rows are taller than normal, try tweaking this value to make scrollbar size more accurate
            }}

            enableGlobalFilterModes
            enableFilterMatchHighlighting
            enableColumnFilterModes
        // initialState={{ showColumnFilters: true }}
        />
    );
};

export default ClientSideVirtualTable;





