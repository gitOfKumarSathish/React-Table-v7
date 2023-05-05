import React from 'react';
import { Cell } from '../../assets/Interfaces';


const ImageCell: React.FC<{ cell: Cell; }> = ({ cell: { value } }) => (
    <img
        src={value}
        width={35}
    />
);

export default ImageCell;
