import { Box, Typography } from '@mui/material';
import React from 'react';

export default function DetailPanel({ row }) {
    console.log('row', row);
    return row.original &&
        <Box
            sx={{
                display: 'grid',
                margin: 'auto',
                gridTemplateColumns: '1fr 1fr',
                width: '100%',
            }}
        >
            <Typography><b>bs:</b> {row.original.about}</Typography>
            {/* <Typography><b>bs:</b> {row.original.additionalInfo[0].bs}</Typography>
            <Typography><b>website:</b> {row.original.website}</Typography>
            <Typography><b>City:</b> {row.original.additionalInfo[0].city}</Typography>
            <Typography><b>street:</b> {row.original.additionalInfo[0].street}</Typography>
            <Typography><b>zipCode:</b> {row.original.additionalInfo[0].zipCode}</Typography> */}
        </Box>;
}


