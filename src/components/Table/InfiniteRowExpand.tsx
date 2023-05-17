import { Box, Typography } from '@mui/material';

function InfiniteRowExpand({ row }: any) {


    return (
        (row.original &&
            <Box className="row-expand" >
                <Typography><b>cardExpire:</b> {row.original.bank.cardExpire}</Typography>
                <Typography><b>Card Number:</b> {row.original.bank.cardNumber}</Typography>
                <Typography><b>Card Type:</b> {row.original.bank.cardType}</Typography>
                <Typography><b>currency:</b> {row.original.bank.currency}</Typography>
            </Box>)
    );
}


export default InfiniteRowExpand;