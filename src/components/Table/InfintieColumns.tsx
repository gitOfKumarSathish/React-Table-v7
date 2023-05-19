import { ColumnType } from "../../assets/Interfaces";

interface IColumn {
    header: string;
    accessorKey: string;
    enableSorting?: boolean;
    className?: string;
    filterFn?: any;
    Cell?: ({ cell }: any) => JSX.Element;
    enableColumnFilter?: any;
}


export function InfintieColumns(data: any[], columnConfigurations: any = []): ColumnType[] {
    const columnKeys = Object.keys(data).filter(
        key => !["hair", "address", "bank", "company"].includes(key)
    );
    return columnKeys.map((columnName) => {
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

        for (let i = 0; i < columnConfigurations.length; i++) {
            const header = columnConfigurations[i].header;
            if (columnName === header) {
                const matchingHeaderProps = columnConfigurations[i];
                console.log('columnConfigurations[i]', columnConfigurations[i]);
                for (const key in matchingHeaderProps) {
                    if (Object.prototype.hasOwnProperty.call(matchingHeaderProps, key)) {
                        const element = matchingHeaderProps[key];
                        const cc = {
                            [key]: matchingHeaderProps[key],
                        };
                        column = { ...column, ...cc };
                        console.log('element', element, cc);
                    }
                }
            }
        }
        console.log('afterColumnConfigurations', column);
        return column;
    });
}
