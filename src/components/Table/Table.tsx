import { useTable, useSortBy } from 'react-table';
import Column from './Columns';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { StyledTableCell, StyledTableRow } from './TableStyle';
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

export default function DisplayTable({ data }: { data: IData[]; }): any {
    const columns: IColumn[] = Column(data);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        { columns, data, },
        useSortBy
    );


    return (
        <>
            <div>Table</div>
            <TableContainer component={Paper}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table" {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map(headerGroup => (
                            <StyledTableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column: any) => (
                                    <StyledTableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted ? column.isSortedDesc ? ' 🔽' : ' 🔼' : ''}
                                        </span>
                                    </StyledTableCell>
                                ))}
                            </StyledTableRow>
                        ))}

                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <StyledTableRow  {...row.getRowProps()}>
                                    {row.cells.map(cell => <StyledTableCell align="center" component="th" scope="row" {...cell.getCellProps()}>{cell.render('Cell')}</StyledTableCell>
                                    )}
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    );
}


