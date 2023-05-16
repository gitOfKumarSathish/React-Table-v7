import { ColumnType } from "../../assets/Interfaces";
import { APIresponse } from "../../assets/sample";
import { useEffect } from 'react';

interface IColumn {
    header: string;
    accessorKey: string;
    enableSorting?: boolean;
    className?: string;
    Cell?: ({ cell }: any) => JSX.Element;
}


export function InfintieColumns(data: any[], isLoading: boolean): ColumnType[] {
    // useEffect(() => {
    // const rowData: any = data?.pages[0].users;
    const columnExtractor = data?.[0];
    const columnLength = Object.keys(columnExtractor).length;
    if (columnLength > 0) {
        const columnKeys = Object.keys(columnExtractor).filter(
            (key) => key !== 'hair' && key !== 'address' && key !== 'bank' && key !== 'company'
        );
        const newColumns: any = columnKeys.map((key) => ({
            accessorKey: key,
            header: key,
            columnFilterModeOptions: ['fuzzy', 'contains', 'startsWith'],
        }));
        console.log('newColumns', newColumns);
        return (newColumns);
    }
    // }, [isLoading, data]);
}
