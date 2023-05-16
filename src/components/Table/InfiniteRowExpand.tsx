import { Box, Typography } from '@mui/material';

function InfiniteRowExpand({ row }) {


    return (
        (row.original &&
            <Box
                sx={{
                    display: 'grid',
                    margin: 'auto',
                    gridTemplateColumns: '1fr 1fr',
                    width: '100%',
                }}
            >

                <Typography><b>cardExpire:</b> {row.original.bank.cardExpire}</Typography>
                <Typography><b>Card Number:</b> {row.original.bank.cardNumber}</Typography>
                <Typography><b>Card Type:</b> {row.original.bank.cardType}</Typography>
                <Typography><b>currency:</b> {row.original.bank.currency}</Typography>
            </Box>)
    );
}


export default InfiniteRowExpand;