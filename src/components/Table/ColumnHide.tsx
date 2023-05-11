import { memo, useContext, useEffect, useState } from 'react';

import { Checkbox } from '@mui/material';

import { ColumnInstance } from 'react-table';
import { ICheckboxProps } from '../../assets/Interfaces';
import { ThemeContext } from '../../App';

const initialColumnState = {};
function HideColumns({ getToggleHideAllColumnsProps, allColumns }: ICheckboxProps) {

    const { setColumnStore } = useContext(ThemeContext);
    const savedState = JSON.parse(localStorage.getItem('columnState') || '{}');


    const [columnState, setColumnState] = useState(savedState || initialColumnState);

    useEffect(() => {
        if (localStorage) {
            // load column state saved in localStorage if it exists
            const savedState = JSON.parse(localStorage.getItem('columnState') || '{}');
            if (savedState) {
                setColumnState(savedState);
                setColumnStore(savedState);
                return;
            }
        }  // use props as initial state if no localStorage exists or saved state is not found
        setColumnState(allColumns.slice(2));
        setColumnStore(savedState);
    }, [allColumns]);

    useEffect(() => {
        if (localStorage) {
            // save columnState to localStorage whenever it changes
            localStorage.setItem('columnState', JSON.stringify(columnState));
        }
    }, [columnState]);

    const renderColumns = allColumns.slice(2);

    const toggleColumnVisibility = (columnId: string) => {
        setColumnState((prevState: { [x: string]: any; }) => {
            const newState = { ...prevState, [columnId]: !prevState[columnId] };
            return newState;
        });
    };

    return (
        <section className=''>
            <h2>Hide Columns</h2>
            {/* <div className='columnName'>
                <label>
                    <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
                </label>
            </div> */}
            {renderColumns.map((column: ColumnInstance, i: number) => (
                <div key={i} className='columnName'>
                    <label>
                        <Checkbox {...column.getToggleHiddenProps()}
                            onClick={() => toggleColumnVisibility(column.id)} /> {column.render('id')}
                    </label>
                </div>
            ))}
        </section>

    );
}

export default memo(HideColumns);
