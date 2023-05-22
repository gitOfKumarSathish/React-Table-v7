function useGlobalConfig(props: { enablePinning: any; enableRowSelection: any; enableMultiRowSelection: any; enableRowOrdering: any; enableColumnOrdering: any; enableRowNumbers: any; enableHiding: any; enableStickyHeader: any; enableExpandAll: any; enableColumnResizing: any; enableGlobalFilterModes: any; enableFilterMatchHighlighting: any; enablePagination: any; enableColumnFilters: any; enableSorting: any; enableGlobalFilter: any; globalFilterFn: any; filterFn: any; enableDensityToggle: any; enableFullScreenToggle: any; enableRowVirtualization: any; hideColumnsDefault: any; }) {

    let {
        enablePinning,
        enableRowSelection,
        enableMultiRowSelection,
        enableRowOrdering,
        enableColumnOrdering,
        enableRowNumbers,
        enableHiding,
        enableStickyHeader,
        enableExpandAll,
        enableColumnResizing,
        enableGlobalFilterModes,
        enableFilterMatchHighlighting,
        enablePagination,
        enableColumnFilters,
        enableSorting,
        enableGlobalFilter,
        globalFilterFn,
        filterFn,
        enableDensityToggle,
        enableFullScreenToggle,
        enableRowVirtualization,
        hideColumnsDefault,
    } = props;


    enablePinning = enablePinning === false ? false : true;
    enableRowSelection = enableRowSelection === false ? false : true;
    enableMultiRowSelection = enableMultiRowSelection === false ? false : true;
    enableRowOrdering = enableRowOrdering === false ? false : true;
    enableColumnOrdering = enableColumnOrdering === false ? false : true;
    enableRowNumbers = enableRowNumbers === false ? false : true;
    enableHiding = enableHiding === false ? false : true;
    enableStickyHeader = enableStickyHeader === false ? false : true;
    enableExpandAll = enableExpandAll === false ? false : true;
    enableColumnResizing = enableColumnResizing === false ? false : true;
    enableGlobalFilterModes = enableGlobalFilterModes === false ? false : true;
    enableFilterMatchHighlighting = enableFilterMatchHighlighting === false ? false : true;
    enablePagination = (enablePagination === false || enablePagination === undefined) ? false : true;
    enableColumnFilters = enableColumnFilters === false ? false : true;
    enableSorting = enableSorting === false ? false : true;
    enableGlobalFilter = enableGlobalFilter === false ? false : true;
    enableDensityToggle = enableDensityToggle === false ? false : true;
    enableFullScreenToggle = enableFullScreenToggle === false ? false : true;
    enableRowVirtualization = enableRowVirtualization === false ? false : true;
    hideColumnsDefault = hideColumnsDefault || [];
    globalFilterFn = globalFilterFn || 'contains';
    filterFn = filterFn || 'contains';


    return {
        enablePinning,
        enableRowSelection,
        enableMultiRowSelection,
        enableRowOrdering,
        enableColumnOrdering,
        enableRowNumbers,
        enableHiding,
        enableStickyHeader,
        enableExpandAll,
        enableColumnResizing,
        enableGlobalFilterModes,
        enableFilterMatchHighlighting,
        enablePagination,
        enableColumnFilters,
        enableSorting,
        enableGlobalFilter,
        globalFilterFn,
        filterFn,
        enableDensityToggle,
        enableFullScreenToggle,
        enableRowVirtualization,
        hideColumnsDefault
    };
}

export default useGlobalConfig;