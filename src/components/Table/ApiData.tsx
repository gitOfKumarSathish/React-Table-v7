import { useQuery } from 'react-query';
import axios from 'axios';
import { memo } from 'react';

import DisplayTable from './Table';
// import { userData } from '../../assets/sample';
import { IQueryResponse } from '../../assets/Interfaces';
import { APIresponse } from '../../assets/sample';

function DataTable() {
    const response: IQueryResponse = useQuery('repoData', () =>
        axios.get("a573c388-3a90-4ac6-8b2e-4944786a58c2")
            .then((response) => response.data)
    );

    if (response.isLoading) return <p>Loading...</p>;
    if (response.error) return <p>An error has occurred: {response.error.message}</p>;

    // return <DisplayTable data={response.data} />;
    // return <DisplayTable data={userData} />;
    return <DisplayTable data={APIresponse.data} disableSorting={APIresponse.disableSorting} selectionType={APIresponse.selectionType} />;
}

export default memo(DataTable);
