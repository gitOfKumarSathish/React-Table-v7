import { useMemo } from "react";

interface IData {
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
};

function Column(data: IData[]) {
  const columnHeaders = Object.keys(data[0]);
  const columns = useMemo(() => columnHeaders.map(header => {
    return {
      Header: header,
      accessor: header
    };
  }), []);
  return columns;
}

export default Column;