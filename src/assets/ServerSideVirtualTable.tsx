import { useEffect, useState, useRef } from 'react';
import MaterialReactTable, {
    MRT_Virtualizer,
    type MRT_ColumnDef,
    type MRT_SortingState,
} from 'material-react-table';
import { useQueryClient } from 'react-query';
import { QueryClient } from 'react-query';
import React from 'react';
import { debounce } from '@mui/material';
import { ServerStyleSheets } from '@mui/styles';

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

const ServerSideVirtualTable = ({ initialData }: { initialData: UserApiResponse; }) => {
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [columns, setColumns] = useState<MRT_ColumnDef<User>[]>([]);

    const queryClientRef = useRef<QueryClient | null>(null);
    if (!queryClientRef.current) {
        queryClientRef.current = new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: Infinity,
                },
            },
        });
        queryClientRef.current.setQueryData(['table-data'], initialData);
    }
    const queryClient = queryClientRef.current;

    useEffect(() => {
        const columnKeys = Object.keys(initialData.data[0]).filter(
            (key) => key !== 'about' && key !== 'isActive' && key !== '_id'
        );
        const newColumns: any = columnKeys.map((key) => ({
            accessorKey: key,
            header: key,
            columnFilterModeOptions: ['fuzzy', 'contains', 'startsWith'],
        }));
        setColumns(newColumns);
    }, [initialData, setColumns]);

    const rowVirtualizerInstanceRef =
        useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null);

    useEffect(() => {
        try {
            rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
        } catch (error) {
            console.error(error);
        }
    }, [sorting]);

    return (
        <MaterialReactTable
            columns={columns}
            queryClient={queryClient}
            queryKey={['table-data', sorting]}
            initialData={initialData}
            enableRowSelection
            enablePagination={false}
            enableRowVirtualization
            enableBottomToolbar={false}
            muiTableContainerProps={{ sx: { maxHeight: '600px' } }}
            state={{ sorting }}
            onSortingChange={setSorting}
            rowVirtualizerInstanceRef={rowVirtualizerInstanceRef}
            rowVirtualizerProps={{
                overscan: 0,
                estimateSize: () => 10,
            }}
            enableGlobalFilterModes
            enableFilterMatchHighlighting
            enableColumnFilterModes
        />
    );
};

export async function getServerSideProps() {
    const fetchURL = new URL(
        'https://mocki.io/v1/c6dd8556-8827-4a98-9589-d6c23b925179'
    );
    const response = await fetch(fetchURL.href, { method: 'GET' });
    const json = (await response.json()) as UserApiResponse;
    const sheets = new ServerStyleSheets();
    const app = sheets.collect(
        <ServerSideVirtualTable initialData={json} />
    );
    const initialData = JSON.parse(JSON.stringify(json));
    return {
        props: {
            app,
            initialData,
        },
    };
}

export default ServerSideVirtualTable;
