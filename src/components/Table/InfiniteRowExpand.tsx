import { Box, Typography } from '@mui/material';
import { memo } from 'react';

function InfiniteRowExpand({ row }: any) {
    const { cardExpire, cardNumber, cardType, currency } = row.original.bank;

    return (
        (row.original &&
            <Box className="row-expand" >
                <Typography><b>cardExpire:</b> {cardExpire}</Typography>
                <Typography><b>Card Number:</b> {cardNumber}</Typography>
                <Typography><b>Card Type:</b> {cardType}</Typography>
                <Typography><b>currency:</b> {currency}</Typography>
            </Box>)
    );
}


export default memo(InfiniteRowExpand);