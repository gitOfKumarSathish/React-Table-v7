import { Dialog, DialogTitle, DialogContent, CheckboxProps, useMediaQuery } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import ColumnHide from './Table/ColumnHide';
import { ThemeContext } from '../App';

function ModalBoxer(props: { open: any; allColumns: any[]; getToggleHideAllColumnsProps: () => CheckboxProps; }) {
    const { open: propsOpen, allColumns, getToggleHideAllColumnsProps } = props;
    const [open, setOpen] = useState(false);

    const { setModalOpen } = useContext(ThemeContext);


    useEffect(() => {
        setOpen(propsOpen);
    }, [propsOpen]);

    const handleClose = () => {
        setModalOpen(false);
        setOpen(false);
    };

    return (
        <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth={'lg'}>
            <DialogTitle className='ModalTitle'>
                <h3>Settings</h3>
                <b onClick={handleClose}>X</b>
            </DialogTitle>
            <DialogContent dividers>
                <ColumnHide allColumns={allColumns} getToggleHideAllColumnsProps={getToggleHideAllColumnsProps} />
            </DialogContent>
        </Dialog>);
}

export default React.memo(ModalBoxer);
