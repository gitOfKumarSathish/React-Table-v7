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

export type {
    IData,
    IColumn
};