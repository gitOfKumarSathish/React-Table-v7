import React from "react";

interface Cell {
    value: string;
}

const ColorCell: React.FC<{ cell: Cell; }> = ({ cell: { value } }) => (
    <p
        style={{
            backgroundColor: value,
        }}
    >
        &nbsp;
    </p>
);

export default React.memo(ColorCell);;
