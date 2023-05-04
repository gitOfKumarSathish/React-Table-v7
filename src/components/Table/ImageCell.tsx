import React from 'react';

interface Cell {
    value: string;
}

const ImageCell: React.FC<{ cell: Cell; }> = ({ cell: { value } }) => (
    <img
        src={value}
        width={35}
    />
);

export default ImageCell;
