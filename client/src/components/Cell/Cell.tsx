import React from 'react';
import './Cell.css'

// define interface for cell properties: boolean and onClick method
interface CellProps {
    occupied: boolean;
    onClick: () => void;
}

/* the cell part of each space of the grid can be occupied 
    or unoccupied, and can also be clicked on to occupied or unoccupied */
const Cell: React.FC<CellProps> = ({ occupied, onClick }) => {
    return (
        <div
            className={`cell ${occupied ? 'occupied' : ''}`}
            onClick={onClick}
        />
    );
};

export default Cell;