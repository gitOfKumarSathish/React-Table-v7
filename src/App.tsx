import { memo } from 'react';
import './App.css';

import InfiniteScroll from './pages/InfiniteScroll';
import { Box, Typography } from '@mui/material';
import { APIresponse } from './assets/sample';
import LocalDataTable from './pages/LocalDataTable';

const configuration = {
  apiHandler: {
    endPoint: 'https://dummyjson.com/users', // API endpoint
    fetchSize: 25, // Fetch Data count
    // dataKey: 'users' // Mandatory Unique identifier key for the api response to get data, Based on the Key we get value, Also to store column in local storage.
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
  rowExpandedDetails: ({ row }: any) => {
    const { cardExpire, cardNumber, cardType, currency } = row.original.bank;
    return (
      (row.original &&
        <Box className="row-expand" >
          <Typography><b>cardExpire:</b> {cardExpire}</Typography>
          <Typography><b>Card Number:</b> {cardNumber}</Typography>
          <Typography><b>Card Type:</b> {cardType}</Typography>
          <Typography><b>currency:</b> {currency}</Typography>
        </Box>)
    );
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
    endPoint: 'https://dummyjson.com/products', // API endpoint
    fetchSize: 50,  // Fetch Data count
    dataKey: 'products' // Mandatory Unique identifier key for the api response to get data, Based on the Key we get value Also to store column in local storage.
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
    hideColumnsDefault: ["images", , "description"] // Hide columns default
  },

  // rowExpandedDetails: ({ row }:any) => {
  //   const { description } = row.original;
  //   return <p>{description}</p>;
  // },
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
  ]

};



const configuration3 = {
  data: APIresponse.data, // Local Data for the Table
  dataKey: "data", // To Store in LocalStorage
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
    hideColumnsDefault: ["about"] // Hide columns default
  },
  rowExpandedDetails: ({ row }: any) => {
    const { about } = row.original;
    return <p>{about}</p>;
  },
  columnConfig: [
    {
      header: 'picture',
      enableColumnFilter: false,
      enableSorting: false,
      filterFn: 'contains',
      Cell: ({ cell }: { cell: any; }) => <img src={cell.getValue()} width={30} />
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

const configuration4 = {
  data: APIresponse.data, // Local Data for the Table
  dataKey: "localResponse", // To Store in LocalStorage
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
    hideColumnsDefault: ["about"] // Hide columns default
  },
  rowExpandedDetails: ({ row }: any) => {
    const { about } = row.original;
    return <p>{about}</p>;
  },
  columnConfig: [
    {
      header: 'picture',
      enableColumnFilter: false,
      enableSorting: false,
      filterFn: 'contains',
      Cell: ({ cell }: { cell: any; }) => <img src={cell.getValue()} width={30} />
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

function App() {

  return (
    <>
      <InfiniteScroll config={configuration} />
      <InfiniteScroll config={configuration2} />
      <InfiniteScroll config={configuration3} />
      <InfiniteScroll config={configuration4} />
    </>
  );
}

export default memo(App);