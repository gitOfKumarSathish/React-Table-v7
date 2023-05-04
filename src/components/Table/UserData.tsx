import { useQuery } from 'react-query';
import axios from 'axios';
import { memo } from 'react';
import DisplayTable from './Table';

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


function DataTable() {
    const response: IQueryResponse = useQuery('repoData', () =>
        axios.get("45cf4fab-ee81-4f7f-bba8-be51b94a367d")
            .then((response) => response.data)
    );

    if (response.isLoading) return <p>Loading...</p>;
    if (response.error) return <p>An error has occurred: {response.error.message}</p>;

    return <DisplayTable data={response.data} />;
}

export default memo(DataTable);
