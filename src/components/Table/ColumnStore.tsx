import React, { useEffect } from 'react';

type Column = {
    id: string;
    getIsVisible: () => boolean;
};

type HiddenColumns = {
    [key: string]: boolean;
};

function ColumnStore(table: any, dataKey: string) {
    useEffect(() => {
        let fl = table.getAllFlatColumns();
        const newHidden = getHiddenColumn(fl);
        localStorage.setItem(`${dataKey} hiddenColumn`, JSON.stringify(newHidden));
    }, [table]);

    function getHiddenColumn(columns: Column[]): HiddenColumns {
        const hiddenColumns = columns
            .filter((column) => !column.getIsVisible())
            .map((column) => ({ id: column.id, isVisible: false }));

        const visibleColumns = columns
            .filter((column) => column.getIsVisible())
            .map((column) => ({ id: column.id, isVisible: true }));

        const allColumns = [...hiddenColumns, ...visibleColumns];

        const columnKeys: HiddenColumns = {};
        allColumns.forEach((column) => (columnKeys[column.id] = column.isVisible));

        return columnKeys;
    }
}

export default ColumnStore;
