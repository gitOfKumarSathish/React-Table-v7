// interface IUser {
//     data: {
//         email: string;
//         id: number;
//         name: string;
//         phone: string;
//         username: string;
//         website: string;
//     };
// }

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

export type {
    IData,
    IColumn,
    IUser,
    IQueryResponse,
    Cell
};