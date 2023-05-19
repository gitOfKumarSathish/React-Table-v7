import { useContext } from "react";
import { ConfigContext } from "../../App";

function ContextStorage() {
    const config: any = useContext(ConfigContext);

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
        enableRowVirtualization
    } = config.globalConfig;

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
        enableRowVirtualization
    };
}

export default ContextStorage;