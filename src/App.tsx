import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import DataTable from './components/Table/ApiData';
import axios from 'axios';
import React, { createContext, memo, useMemo, useState } from 'react';

const queryClient = new QueryClient();

export const ThemeContext = createContext({
  userName: '',
  setUserName: (e?: string) => { },
  modalOpen: false,
  setModalOpen: (e?: boolean) => { },
});

function App() {
  const [userName, setUserName] = useState('John Smith');
  const [modalOpen, setModalOpen] = useState(false);

  const value: any = useMemo(() => ({ userName, setUserName, modalOpen, setModalOpen }), [userName, modalOpen]);

  axios.defaults.baseURL = 'https://mocki.io/v1/';

  return (
    <ThemeContext.Provider value={value}>
      <QueryClientProvider client={queryClient}>
        <DataTable />
      </QueryClientProvider>
    </ThemeContext.Provider>
  );
}

export default memo(App);
