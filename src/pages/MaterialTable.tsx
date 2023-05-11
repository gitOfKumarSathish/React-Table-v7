import React, { useMemo, useState, useEffect } from 'react';
import MaterialReactTable, {
    MRT_RowSelectionState,
    type MRT_ColumnDef,
    type MRT_Row,
} from 'material-react-table';
import { APIresponse } from '../assets/sample';
import { Box, Typography } from '@mui/material';

const Example = () => {

    const columns = useMemo<MRT_ColumnDef[]>(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
            },
            {
                header: 'id',
                accessorKey: 'id',
            },
            {
                header: 'Email',
                accessorKey: 'email',
                enableSorting: false,
            },
            {
                header: 'phone',
                accessorKey: 'phone',
                enableSorting: false,
            },
            {
                header: 'website',
                accessorKey: 'website',
            },
            {
                header: 'color',
                accessorKey: 'color',
                enableSorting: false,
                Cell: ({ cell }) => (
                    <p
                        style={{
                            'backgroundColor': cell.getValue(),
                        }}
                        className='colorBox'
                    >
                        &nbsp;
                    </p>)
                // enableGrouping: false, //do not let this column be grouped
            },
            {
                header: 'image',
                accessorKey: 'image',
                Cell: ({ cell }) => (
                    <img
                        src={cell.getValue()}
                        width={35}
                    />
                )
                // Cell: ImageCell
                // enableGrouping: false, //do not let this column be grouped
            },



        ], []);


    const [data, setData] = useState(() => APIresponse.data);

    //optionally, you can manage the row selection state yourself
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    useEffect(() => {
        //do something when the row selection changes...
        console.info({ rowSelection });
    }, [rowSelection]);

    return (
        <MaterialReactTable
            columns={columns}
            data={data}
            renderDetailPanel={({ row }) => (
                (row.original?.additionalInfo[0] &&
                    <Box
                        sx={{
                            display: 'grid',
                            margin: 'auto',
                            gridTemplateColumns: '1fr 1fr',
                            width: '100%',
                        }}
                    >
                        <Typography><b>bs:</b> {row.original.additionalInfo[0].bs}</Typography>
                        <Typography><b>website:</b> {row.original.website}</Typography>
                        <Typography><b>City:</b> {row.original.additionalInfo[0].city}</Typography>
                        <Typography><b>street:</b> {row.original.additionalInfo[0].street}</Typography>
                        <Typography><b>zipcode:</b> {row.original.additionalInfo[0].zipcode}</Typography>
                    </Box>)
            )}

            enableRowSelection


            enableColumnResizing
            enableRowOrdering
            // // enableGrouping
            enableStickyHeader
            enableStickyFooter

            enableRowDragging

            enableColumnOrdering

            enableColumnFilterModes
            muiTableHeadCellFilterTextFieldProps={{
                sx: { m: '0.5rem 0', width: '100%' },
                variant: 'outlined',
            }}

            initialState={{
                density: 'compact',
                columnVisibility: { name: true },
                // expanded: true, //expand all groups by default
                // grouping: ['id'], //an array of columns to group by by default (can be multiple)
                // pagination: { pageIndex: 0, pageSize: 20 },
                // sorting: [{ id: 'id', desc: false }], //sort by state by default
            }}
            // muiToolbarAlertBannerChipProps={{ color: 'primary' }}
            // muiTableContainerProps={{ sx: { maxHeight: 700 } }}
            muiTableBodyRowProps={({ row }) => ({
                onClick: row.getToggleSelectedHandler(),
                sx: { cursor: 'pointer' },
            })}
            getRowId={(row) => row?.name} //give each row a more useful id
            onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
            state={{ rowSelection }}
            enableMultiRowSelection={APIresponse.selectionType === 'multi'}
            muiTableBodyRowDragHandleProps={({ table }) => ({
                onDragEnd: () => {
                    const { draggingRow, hoveredRow } = table.getState();
                    if (hoveredRow && draggingRow) {
                        data.splice(
                            (hoveredRow as MRT_Row).index,
                            0,
                            data.splice(draggingRow.index, 1)[0],
                        );
                        setData([...data]);
                    }
                },
            })}


            positionExpandColumn="first"
        />
    );
};

// "company name": "Romaguera-Crona",
//     "catchPhrase": "Multi-layered client-server neural-net",
//         "bs": "harness real-time e-markets",
//             "street": "Kulas Light",
//                 "suite": "Apt. 556",
//                     "city": "Gwenborough",
//                         "zipcode": "92998-3874",

export default React.memo(Example);
