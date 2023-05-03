import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import DataTable from './components/Table/UserData';
import axios from 'axios';
import { memo } from 'react';


const queryClient = new QueryClient();

function App() {
  axios.defaults.baseURL = 'https://mocki.io/v1/';
  return (
    <QueryClientProvider client={queryClient}>
      <DataTable />
    </QueryClientProvider>
  );
}

export default memo(App);
