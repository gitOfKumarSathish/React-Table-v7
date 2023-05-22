import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from 'react';
import { CheckboxProps } from '@mui/material';

interface IData {
    email: string;
    id: number;
    name: string;
    phone: string;
    username: string;
    website: string;
};

interface IColumn {
    Header: string;
    accessor: any;
}

interface IUser {
    email: string;
    id: number;
    name: string;
    phone: string;
    username: string;
    website: string;
}


interface IQueryResponse {
    isLoading: boolean;
    error?: { message: string; };
    data: IUser[];
}


interface Cell {
    value: string;
}

interface SelectedColumn {
    [key: string]: boolean;
}

interface ICheckboxProps {
    getToggleHideAllColumnsProps: () => CheckboxProps;
    allColumns: any[];
}

type SortingDisableType = string[];

interface RowProps {
    additionalInfo: any; original: { additionalInfo: { [key: string]: string; }[]; };
}

interface Info {
    [key: string]: string | number;
}

type ColumnType = {
    header: string;
    accessorKey: string;
    enableSorting?: boolean;
    Cell?: any;
    className?: string;
};

interface UserApiResponse {
    total: number;
    users?: any[];
    limit: number;
    products?: any[];
}

export type {
    IData,
    IColumn,
    IUser,
    IQueryResponse,
    Cell,
    SelectedColumn,
    ICheckboxProps,
    SortingDisableType,
    ColumnType,
    RowProps,
    Info,
    UserApiResponse
};


// Define the type of the columns
// type Column = {
//     Header: string;
//     accessor: string;
//     // Add more properties as needed
// };

// Create a generic table props type to allow for any columns
// type TableProps<T extends object> = {
//     columns: ColumnInstance<T>[];
//     data: T[];
// };