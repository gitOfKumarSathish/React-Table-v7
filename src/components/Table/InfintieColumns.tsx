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


export function InfintieColumns(data: any[] = [], columnConfigurations: any = [], defaultColumnFilter: string, hideColumnsDefault: string[] = []): ColumnType[] {
    const columnKeys = Object.keys(data).filter(
        (key: string) => !hideColumnsDefault.includes(key)
    );
    return columnKeys.map((columnName) => {
        let column: IColumn = {
            header: columnName,
            accessorKey: columnName,
            filterFn: defaultColumnFilter,
        };
        for (let i = 0; i < columnConfigurations.length; i++) {
            const header = columnConfigurations[i].header;
            if (columnName === header) {
                const matchingHeaderProps = columnConfigurations[i];
                for (const key in matchingHeaderProps) {
                    if (Object.prototype.hasOwnProperty.call(matchingHeaderProps, key)) {
                        const cc = {
                            [key]: matchingHeaderProps[key],
                        };
                        column = { ...column, ...cc };
                    }
                }
            }
        }
        // console.log('afterColumnConfigurations', column);
        return column;
    });
}
