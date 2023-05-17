import { createContext, memo, useMemo, useState } from 'react';
import axios from 'axios';
import './App.css';

import InfiniteScroll from './pages/InfiniteScroll';

axios.defaults.baseURL = 'https://dummyjson.com/';

export const ThemeContext = createContext({
  userName: '',
  setUserName: (name: string) => { },
  modalOpen: false,
  setModalOpen: (isOpen: boolean) => { },
  columnStore: {},
  setColumnStore: (columns: any[]) => { },
});



function App() {
  const [userName, setUserName] = useState('John Smith');
  const [modalOpen, setModalOpen] = useState(false);
  const [columnStore, setColumnStore] = useState(JSON.parse(localStorage.getItem('columnState') || '{}'));

  const value: any = useMemo(() => ({ userName, setUserName, modalOpen, setModalOpen, columnStore, setColumnStore }), [userName, modalOpen, columnStore]);

  return (
    <ThemeContext.Provider value={value}>
      <InfiniteScroll />
    </ThemeContext.Provider>
  );
}

export default memo(App);