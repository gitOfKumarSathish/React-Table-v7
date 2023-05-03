import { useTable, useSortBy } from 'react-table';
import Column from './Columns';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { StyledTableCell, StyledTableRow } from './TableStyle';
import { useState } from 'react';

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

    const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
    const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);
    const [selectType, setSelectType] = useState<'single' | 'multi'>('single');

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        { columns, data },
        useSortBy
    );

    function handleRowClick(row: any) {
        if (selectType === 'single') { // single-select
            if (selectedRowIndex >= 0) {
                rows[selectedRowIndex].isSelected = false; // clear previous selection
            }
            row.isSelected = true;
            setSelectedRowIndex(row.index);
        } else { // multi-select
            const id = row.original.id.toString(); // use row's unique id as key
            const newSelectedRowIds = [...selectedRowIds];
            const index = selectedRowIds.indexOf(id);
            if (index >= 0) {
                newSelectedRowIds.splice(index, 1);
            } else {
                newSelectedRowIds.push(id);
            }
            setSelectedRowIds(newSelectedRowIds);
        }
    }

    function handleSelectAllClick() {
        const newSelectedRowIds = selectType === 'multi' ? data.map((n) => n.id.toString()) : [];
        setSelectedRowIds(newSelectedRowIds);
    }

    return (
        <>
            <div>Table</div>
            <div>
                <label>Select Type: </label>
                <select value={selectType} onChange={(e) => setSelectType(e.target.value as 'single' | 'multi')}>
                    <option value="single">Single</option>
                    <option value="multi">Multi</option>
                </select>
            </div>
            <TableContainer component={Paper}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table" {...getTableProps()}>
                    <TableHead>
                        <TableRow sx={{ minWidth: '100%' }}>
                            {selectType === 'multi' &&
                                <StyledTableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={selectedRowIds.length > 0 && selectedRowIds.length < data.length}
                                        checked={selectedRowIds.length === data.length}
                                        onChange={handleSelectAllClick}
                                        inputProps={{ 'aria-label': 'select all' }}
                                    />
                                </StyledTableCell>
                            }
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
                        </TableRow>
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <StyledTableRow
                                    {...row.getRowProps()}
                                    onClick={() => handleRowClick(row)}
                                    style={{
                                        backgroundColor:
                                            (selectType === 'single' && row.isSelected) || (selectType === 'multi' && selectedRowIds.includes(row.original.id.toString()))
                                                ? '#e0e0e0'
                                                : 'transparent',
                                    }}
                                >
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