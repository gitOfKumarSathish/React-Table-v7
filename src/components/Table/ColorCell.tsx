import React from "react";
import { Cell } from "../../assets/Interfaces";


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
