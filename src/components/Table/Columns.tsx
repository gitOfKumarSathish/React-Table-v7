import { ColumnType } from "../../assets/Interfaces";
import { APIresponse } from "../../assets/sample";

interface IColumn {
    header: string;
    accessorKey: string;
    enableSorting?: boolean;
    className?: string;
    Cell?: ({ cell }: any) => JSX.Element;
}

export function Columns(columnsList: string[], data: any[]): ColumnType[] {
    return columnsList.map((columnName: string) => {
        console.log('data.map(item => item[columnName])', data.map(item => item[columnName]));
        // data.map(item => {
        //     console.log('item', item[columnName]);
        // });
        let column: IColumn = {
            header: columnName,
            accessorKey: columnName,
            // filterVariant: 'multi-select',
            // filterSelectOptions: data.map(item => item[columnName]),
        };
        if (APIresponse.disableSorting.includes(columnName)) {
            column.enableSorting = false;
            column.className = 'disabledSorting';
        }
        if (columnName === "image") {
            column.Cell = ({ cell }: { cell: any; }) => <img src={cell.getValue()} width={35} />;
        }
        else if (columnName === "color") {
            column.Cell = ({ cell }: { cell: any; }) => (
                <p
                    style={{
                        backgroundColor: cell.getValue(),
                    }}
                    className='colorBox'
                >
                    &nbsp;
                </p>);
        }
        else if (columnName === "website") {
            column.Cell = ({ cell }: { cell: any; }) => (
                <p
                    style={{
                        color: cell.row.original.color,
                    }}
                >
                    {cell.getValue()}
                </p>);
        }
        return column;
    });
}
