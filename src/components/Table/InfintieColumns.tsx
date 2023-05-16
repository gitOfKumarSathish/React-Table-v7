import { ColumnType } from "../../assets/Interfaces";
import { APIresponse } from "../../assets/sample";
import { useEffect } from 'react';

interface IColumn {
    header: string;
    accessorKey: string;
    enableSorting?: boolean;
    className?: string;
    Cell?: ({ cell }: any) => JSX.Element;
}


export function InfintieColumns(data: any[]): ColumnType[] {
    const columnKeys = Object.keys(data).filter(
        (key) => key !== 'hair' && key !== 'address' && key !== 'bank' && key !== 'company'
    );
    return columnKeys.map((columnName: string) => {
        let column: IColumn = {
            header: columnName,
            accessorKey: columnName,
        };
        if (columnName === "image") {
            column.Cell = ({ cell }: { cell: any; }) => <img src={cell.getValue()} width={35} />;
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
