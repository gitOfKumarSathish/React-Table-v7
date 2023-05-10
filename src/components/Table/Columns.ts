import { useMemo } from "react";
import ColorCell from "./ColorCell";
import ImageCell from "./ImageCell";
import { ColumnType, IData, SortingDisableType } from "../../assets/Interfaces";

function createColumns(columnsList: string[], sortingDisable: SortingDisableType, ImageCell: any, ColorCell: any): ColumnType[] {
  return columnsList.map(header => {
    let column: ColumnType = { Header: header, accessor: header };
    if (sortingDisable.includes(header)) {
      column.disableSortBy = true;
      column.className = 'disabledSorting';
    }
    if (header === "image") {
      column.Cell = ImageCell;
    } else if (header === "color") {
      column.Cell = ColorCell;
    }
    return column;
  });
}

function Column(data: IData[], sortingDisable: SortingDisableType): ColumnType[] {
  const columnsList = Object.keys(data[0]).filter(col => col !== 'additionalInfo');
  const columns = useMemo(() => createColumns(columnsList, sortingDisable, ImageCell, ColorCell), []);
  return columns;
}

export default Column;
