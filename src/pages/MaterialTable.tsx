import React, { useMemo, useState, useEffect } from 'react';
import MaterialReactTable, {
    MRT_RowSelectionState,
    type MRT_Row,
    MRT_ToggleFiltersButton,
    MRT_ShowHideColumnsButton
} from 'material-react-table';
import { APIresponse } from '../assets/sample';
import { Box, IconButton, Tooltip, Typography, Zoom } from '@mui/material';
import { Columns } from '../components/Table/Columns';
import InfoIcon from '@mui/icons-material/Info';

const MaterialTable = () => {
    // prepare Columns Title
    const [data, setData] = useState(() => APIresponse.data);
    const columnsList = Object.keys(APIresponse.data[0]).filter(col => col !== 'additionalInfo');
    const columns = useMemo(() => Columns(columnsList, data), []);

    // set Data 

    //optionally, you can manage the row selection state yourself
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

    useEffect(() => {
        //do something when the row selection changes...
        console.info({ rowSelection });
    }, [rowSelection]);

    console.log('columns: ', columns);




    // Alternative way using destructuring assignment:
    // const { columnVisibility } = JSON.parse(localStorage.getItem('columnState'));

    // function storeColumns() {
    //     const columns = table.getAllFlatColumns();
    //     const visibilityState = {};
    //     columns.forEach((column) => {
    //         visibilityState[column.id] = column.getIsVisible();
    //     });
    //     console.log('visibilityState', visibilityState);
    //     localStorage.setItem('columnVisibility', JSON.stringify(visibilityState));
    // }
    return (
        <MaterialReactTable
            columns={columns}
            data={data}
            isMultiSortEvent={() => true}
            // muiTableHeadCellColumnActionsButtonProps={{
            //     onClick: storeColumns,
            // }}
            // }}
            // }}
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
                        <Typography><b>zipCode:</b> {row.original.additionalInfo[0].zipCode}</Typography>
                    </Box>)
            )}

            enableRowSelection


            enableColumnResizing

            enableRowOrdering
            enableColumnOrdering

            enableStickyHeader
            enableStickyFooter

            enableRowDragging

            enableGlobalFilterModes
            enableColumnFilterModes
            muiTableHeadCellFilterTextFieldProps={{
                sx: { m: '0.5rem 0', width: '100%' },
                variant: 'outlined',
            }}

            positionExpandColumn="first"

            enableDensityToggle={false}
            // memoMode="cells"

            initialState={{
                density: 'compact',
                // columnVisibility: { JSON.parse(localStorage.getItem('columnState'))[0] },
                // expanded: true, //expand all groups by default
                // grouping: ['id'], //an array of columns to group by by default (can be multiple)
                // pagination: { pageIndex: 0, pageSize: 20 },
                // sorting: [{ id: 'id', desc: false }], //sort by state by default
            }}
            muiToolbarAlertBannerChipProps={{ color: 'primary' }}
            muiTableContainerProps={{ sx: { maxHeight: 500 } }}
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
            enablePagination={false}
            enablePinning
            renderToolbarInternalActions={({ table }) => (
                <Box>
                    {/* add custom button to print table  */}


                    {/* along-side built-in buttons in whatever order you want them */}
                    <MRT_ToggleFiltersButton table={table} />
                    {/* <MRT_ToggleDensePaddingButton table={table} /> */}
                    {/* <MRT_FullScreenToggleButton table={table} /> */}
                    <MRT_ShowHideColumnsButton table={table} />
                    <Tooltip TransitionComponent={Zoom} title="To perform multiple sorting, please press and hold down the Shift key.">
                        <IconButton >
                            <InfoIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            )}
        // muiTableHeadCellColumnActionsButtonProps={row => console.log('row', (row.table.getAllFlatColumns()).map(x => x.getIsVisible()))}
        // muiTableHeadCellColumnActionsButtonProps={row => storeColumns(row.table.getAllFlatColumns())}
        // displayColumnDefOptions={{ 'mrt-row-actions': { size: 300 } }}
        // renderTopToolbarCustomActions={() => (
        //     <Typography component="span" variant="h4">
        //         Memoized Cells
        //     </Typography>
        // )}


        />
    );
    // function storeColumns(columnList: any[]) {
    //     const falseIndices = columnList
    //         .filter((column) => !column.getIsVisible())
    //         .map((column) => ({ [column.id]: false }));

    //     localStorage.setItem('columnState', JSON.stringify(falseIndices));

    //     console.log('falseIndices', falseIndices);

    // }

};

export default React.memo(MaterialTable);


