import { createContext, memo } from 'react';
import axios from 'axios';
import './App.css';

import InfiniteScroll from './pages/InfiniteScroll';

axios.defaults.baseURL = 'https://dummyjson.com/';

export const ConfigContext = createContext({});

const configuration = {
  apiHandler: {
    endPoint: 'https://dummyjson.com/users/',
    fetchSize: 25,
    dataKey: 'users'
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
    enableSorting: false, // Sorting Property
    enableGlobalFilter: false, // Global Filter Property,
    enableGlobalFilterModes: false, // Global Filter Mode Property
    globalFilterFn: 'contains', // Global Filter
    filterFn: 'startsWith', // Individual Column Filter
    enableDensityToggle: false, // Enable density toggle padding property
    enableFullScreenToggle: false, // Enable full screen toggle property
    enableRowVirtualization: true, // Enable row virtualization
    hideColumnsDefault: ["hair", "address", "bank", "company"] // Hide columns default
  },
  columnConfig: [
    {
      header: 'image',
      enableColumnFilter: false,
      enableSorting: false,
      filterFn: 'contains',
      Cell: ({ cell }: { cell: any; }) => <img src={cell.getValue()} width={30} />
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
      Cell: ({ cell }: { cell: any; }) => (
        <p
          style={{
            backgroundColor: cell.getValue(),
          }}
          className='colorBox'
        >
          &nbsp;
        </p>)
    }
  ]

};

const configuration2 = {
  apiHandler: {
    endPoint: 'https://dummyjson.com/products/',
    fetchSize: 50,
    dataKey: 'products'
  },
  globalConfig: {
    // enablePinning: false,
    // enableRowSelection: false,
    // enableMultiRowSelection: false,
    // enableRowOrdering: false,
    // enableColumnOrdering: false,
    // enableRowNumbers: false, // turn on row numbers # of rows
    // enableHiding: false, // Hiding Columns Property
    // enableStickyHeader: false, // Sticky Header Property
    // enableExpandAll: false, // Expand All Property
    // enableColumnResizing: false, // Column Resizing Property
    // enableFilterMatchHighlighting: false,
    // enablePagination: false, // Pagination Property,
    // // enableColumnFilters: false, // Column Filters Property
    // enableSorting: false, // Sorting Property
    // enableGlobalFilter: false, // Global Filter Property,
    // enableGlobalFilterModes: false, // Global Filter Mode Property
    // globalFilterFn: 'contains', // Global Filter
    // filterFn: 'startsWith', // Individual Column Filter
    // enableDensityToggle: false, // Enable density toggle padding property
    // enableFullScreenToggle: false, // Enable full screen toggle property
    // enableRowVirtualization: true, // Enable row virtualization,
    hideColumnsDefault: ["images"] // Hide columns default
  },
  columnConfig: [
    {
      header: 'thumbnail',
      enableColumnFilter: false,
      enableSorting: false,
      filterFn: 'contains',
      Cell: ({ cell }: { cell: any; }) => <img src={cell.getValue()} width={30} />
    },
    {
      header: 'height',
      enableColumnFilter: false,
      enableSorting: false,
    },
    {
      header: 'title',
      Cell: ({ cell }: { cell: any; }) => {
        console.log('cell', cell.row.original.category === "smartphones");
        return (<p
          style={{
            color: colorCodes(),
          }}
        // className='colorBox'
        >{cell.getValue()}</p>);


        function colorCodes() {
          // return cell.row.original.category === "smartphones" ? "Red" : "Green";
          switch (cell.row.original.category) {
            case "smartphones":
              return "Red";
              break;
            case "laptops":
              return "yellow";
              break;
            case "skincare":
              return "green";
              break;

            default:
              return "black";
              break;
          }
        }
      }
    }
    // {
    //   header: 'eyeColor',
    //   enableColumnFilter: false,
    //   enableSorting: false,
    //   Cell: ({ cell }: { cell: any; }) => (
    //     <p
    //       style={{
    //         backgroundColor: cell.getValue(),
    //       }}
    //       className='colorBox'
    //     >
    //       &nbsp;
    //     </p>)
    // }
  ]

};

function App() {

  return (
    <>

      <InfiniteScroll config={configuration} />
      <InfiniteScroll config={configuration2} />
    </>
  );
}

export default memo(App);