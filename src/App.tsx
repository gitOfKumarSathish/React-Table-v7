import { createContext, memo, useMemo, useState } from 'react';
import axios from 'axios';
import './App.css';

import InfiniteScroll from './pages/InfiniteScroll';

axios.defaults.baseURL = 'https://dummyjson.com/';

export const ConfigContext = createContext({});

const configuration = {
  apiHandler: {
    endPoint: 'https://dummyjson.com/users/',
    fetchSize: 25
  },
  globalConfig: {
    enablePinning: false,
    enableRowSelection: false,
    enableMultiRowSelection: false,
    enableRowOrdering: false,
    enableColumnOrdering: false,
    enableRowNumbers: false, // turn on row numbers # of rows
    enableHiding: false, // Hiding Columns Property
    enableStickyHeader: false, // Sticky Header Property
    enableExpandAll: false, // Expand All Property
    enableColumnResizing: false, // Column Resizing Property
    enableFilterMatchHighlighting: false,
    enablePagination: false, // Pagination Property,
    // enableColumnFilters: false, // Column Filters Property
    // enableSorting: false, // Sorting Property
    enableGlobalFilter: false, // Global Filter Property,
    enableGlobalFilterModes: false, // Global Filter Mode Property
    globalFilterFn: 'contains', // Global Filter
    enableDensityToggle: false, // Enable density toggle padding property
    enableFullScreenToggle: false, // Enable full screen toggle property
    enableRowVirtualization: false, // Enable row virtualization
  },
  columnConfig: [
    {
      header: 'image',
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      header: 'height',
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      header: 'eyeColor',
      enableColumnFilter: false,
      enableSorting: false,
    }
  ]

};

function App() {

  return (
    <ConfigContext.Provider value={configuration}>
      <InfiniteScroll />
    </ConfigContext.Provider>
  );
}

export default memo(App);