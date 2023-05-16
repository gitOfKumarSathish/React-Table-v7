import { createContext, memo, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import DataTable from './components/Table/ApiData';
import './App.css';
import MaterialTable from './pages/MaterialTable';
import ServerRendering from './assets/ServerRendering';
import ExampleWithReactQueryProvider from './pages/InfinteScroll';
import ClientSideVirtualTable from './pages/ClientSideVirtualTable';
import InfinteScroll from './pages/InfinteScroll';


export const ThemeContext = createContext({
  userName: '',
  setUserName: (e?: string) => { },
  modalOpen: false,
  setModalOpen: (e?: boolean) => { },
  columnStore: {},
  setColumnStore: (e?: []) => { },
});

const queryClient = new QueryClient();
axios.defaults.baseURL = 'https://mocki.io/v1/';

function App() {
  const [userName, setUserName] = useState('John Smith');
  const [modalOpen, setModalOpen] = useState(false);
  const [columnStore, setColumnStore] = useState(JSON.parse(localStorage.getItem('columnState') || '{}'));


  const value: any = useMemo(() => ({ userName, setUserName, modalOpen, setModalOpen, columnStore, setColumnStore }), [userName, modalOpen, columnStore]);

  return (
    <ThemeContext.Provider value={value}>
      <QueryClientProvider client={queryClient}>
        {/* <DataTable /> */}
        {/* <MaterialTable /> */}
        {/* <ExampleWithReactQueryProvider /> */}
        {/* <ClientSideVirtualTable /> */}
        {/* <InfinteScroll /> */}
        {<ExampleWithReactQueryProvider />}
      </QueryClientProvider>
    </ThemeContext.Provider>
  );
}

export default memo(App);
