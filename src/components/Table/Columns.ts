import { useMemo } from "react";

import ColorCell from "./ColorCell";
import ImageCell from "./ImageCell";
import { IData } from "../../assets/Interfaces";

function Column(data: IData[]) {
  const columnsList = Object.keys(data[0]);
  const columnHeaders = columnsList.slice(0, columnsList.length - 1);
  const columns = useMemo(() => columnHeaders.map(header => {
    const finalColumn = header === 'image'
      ? { Header: header, accessor: header, Cell: ImageCell, }
      : header === 'color'
        ? { Header: header, accessor: header, Cell: ColorCell }
        : { Header: header, accessor: header };
    return finalColumn;
  }), []);
  return columns;
}

export default Column;

// disableSortBy: true
