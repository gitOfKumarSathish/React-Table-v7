import { ColumnType } from "../../assets/Interfaces";

interface IColumn {
    header: string;
    accessorKey: string;
    enableSorting?: boolean;
    className?: string;
    filterFn?: any;
    Cell?: ({ cell }: any) => JSX.Element;
}


export function InfintieColumns(data: any[]): ColumnType[] {
    const columnKeys = Object.keys(data).filter(
        key => !["hair", "address", "bank", "company"].includes(key)
    );
    return columnKeys.map((columnName: string) => {
        let column: IColumn = {
            header: columnName,
            accessorKey: columnName,
            filterFn: 'includesString',
        };
        if (columnName === "image") {
            column.Cell = ({ cell }: { cell: any; }) => <img src={cell.getValue()} width={30} />;
        }
        else if (columnName === "eyeColor") {
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
        return column;
    });
}
