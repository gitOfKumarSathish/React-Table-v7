import { useMemo } from "react";
import ColorCell from "./ColorCell";
import ImageCell from "./ImageCell";
import { IData } from "../../assets/Interfaces";

type SortingDisableType = string[];

type ColumnType = {
  Header: string;
  accessor: string;
  disableSortBy?: boolean;
  Cell?: any;
  className?: string;
};

function Column(data: IData[], sortingDisable: SortingDisableType): ColumnType[] {
  const columnsList = Object.keys(data[0]);
  const columnHeaders = columnsList.slice(0, columnsList.length - 1);
  const columns = useMemo(() => columnHeaders.map(header => {

    let column: ColumnType = { Header: header, accessor: header };
    if (sortingDisable.includes(header)) {
      column = { ...column, disableSortBy: true, className: 'disabledSorting' };
    }
    if (header === "image") {
      column = { ...column, Cell: ImageCell };
    } else if (header === "color") {
      column = { ...column, Cell: ColorCell };
    }
    console.log('columns: ', column);
    return column;
  }), []);
  return columns;
}

export default Column;
