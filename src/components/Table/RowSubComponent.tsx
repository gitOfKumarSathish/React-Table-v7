import { Typography } from "@mui/material";
import { memo, useCallback } from "react";
import { RowProps, Info } from "../../assets/Interfaces";

const RowSubComponent = memo(({ row }: { row: { original: RowProps; }; }) => {
    const renderAdditionalInfo = useCallback(() => {
        if (!row.original.additionalInfo) return null;

        return row.original.additionalInfo.map((info: Info) => (
            <Typography align="left" className="additionalInfo" key={info.id}>
                {Object.entries(info).map(([key, value]) => (
                    <p className="lineInfo" key={key}>
                        <strong>{key}: </strong>
                        {value}
                    </p>
                ))}
            </Typography>
        ));
    }, [row.original.additionalInfo]);

    return <>{renderAdditionalInfo()}</>;
});

export default RowSubComponent;
