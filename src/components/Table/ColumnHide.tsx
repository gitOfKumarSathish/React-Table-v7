import { memo } from 'react';

import { Checkbox } from '@mui/material';

import { ColumnInstance } from 'react-table';
import { ICheckboxProps } from '../../assets/Interfaces';



function HideColumns({ getToggleHideAllColumnsProps, allColumns }: ICheckboxProps) {
    // Hide columns for Expanded and Selections columns
    // const localColumns = localStorage.setItem('localColumns', )
    const columnList = allColumns.slice(2);

    return (<section className='columnToggler'>
        <h2>Hide Columns</h2>
        <div className='columnName'>
            <label>
                <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
            </label>
        </div>
        {columnList.map((column: ColumnInstance, i: number) => (
            <div key={i} className='columnName'>
                <label>
                    <Checkbox {...column.getToggleHiddenProps()} /> {column.render('id')}
                </label>
            </div>
        ))}
    </section>
    );
}

export default memo(HideColumns);
