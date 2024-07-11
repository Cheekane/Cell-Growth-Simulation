import React from 'react';
import Cell from '../Cell/Cell';
import './Grid.css'

// grid props from App
interface GridProps {
    grid: boolean[][];
    setGrid: React.Dispatch<React.SetStateAction<boolean[][]>>;
}

/* The grid contains a defaulted 20x20 cell 2D array to indicate whether or not 
    a cell is occupied by a bacteria
*/
const Grid: React.FC<GridProps> = ({ grid, setGrid }) => {
    
    /* handles the cell click, row and col of clicked cell, map out the grid
    find the cell where the click occurred and flip the cell's occupied flag */
    const handleCellClick = (row: number, col: number) => {
        const newGrid = grid.map((gridRow, rowIndex) => (
            gridRow.map((cell, colIndex) => (
                rowIndex === row && colIndex === col ? !cell : cell
            ))
        ))
        // setState of the updated grid with added or removed bacteria and re-renders
        setGrid(newGrid);
    }
    
    // dynamically set the grid-template-columns style to the set column size
    return (
        <div className='grid' style={{ 
            width: `fit-content`,
            height: `fit-content`,
            gridTemplateColumns: `repeat(${grid.length}, 20px)`,
            gridTemplateRows: `repeat(${grid[0].length}, 20px)`
        }}>
            {grid.map((row, rowIndex) => (
                <div className='col' key={rowIndex}>
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={colIndex}
                            occupied={cell}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};


export default Grid;