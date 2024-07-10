import React, { useState, useEffect, useRef } from 'react';
import Grid from '../src/components/Grid/Grid';
import Controls from '../src/components/Controls/Controls';
import './App.css';

/* 
    method to initialize grid and fill cells with default occupied value false
    time complexity: O(n^2) (rows x cols)
*/
const createGrid = (rows: number, cols: number): boolean[][] => {
    const grid: boolean[][] = []

    // iterate through each row and column and fill each cell with false unoccupied flag
    for (let i = 0; i < rows; i++) {
        grid[i] = []
        for (let j = 0; j < cols; j++) {
            grid[i][j] = false
        }
    }
    return grid
}

/* 
    searches for an empty adjacent cell from every bacteria occupied cell and updates 
    the grid with the inserted bacteria, then returns the updated grid
*/
const updateGrid = (grid: boolean[][]): boolean[][] => {
    // create copy of grid by mapping each nested array, then use slice to copy array
    const newGrid = grid.map(row => row.slice())

    // iterate through grid rows and columns
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            // if there is an occupied cell in the grid try to divide into empty cell
            if (grid[row][col]) {
                const neighbours = [
                    [row - 1, col], // up
                    [row + 1, col], // down
                    [row, col - 1], // left
                    [row, col + 1] // right
                ]

                // iterate through neighbours array 
                for (const [rowIndex, colIndex] of neighbours) {
                    // check if the neighbours are out of bounds
                    if (rowIndex >= 0 && rowIndex < grid.length && colIndex >= 0 && colIndex < grid[row].length) {
                        // check if the cell is occupied, if not occupied, occupy neighbour cell
                        if (!grid[rowIndex][colIndex]) {
                            newGrid[rowIndex][colIndex] = true
                            break;
                        }
                    }
                }
            }
        }
    }
    return newGrid
}

/*
    main method containing the display layout, grid, cell and controls components
    includes division interval and running state
*/
const App: React.FC = () => {
    // initialize useStates for grid, is simulation running?, division interval (ms)
    const [grid, setGrid] = useState<boolean[][]>(createGrid(20, 20))
    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [interval, setInterval] = useState<number>(1000)
    
    // 
    useEffect(() => {
        // if the simulation is running, run updateGrid with the grid
        if (isRunning) {
            const timer = window.setInterval(() => {
                setGrid((prevGrid) => updateGrid(prevGrid))
            }, interval)
        }
    }, [isRunning])

    return (
        <div className='app'>
            <div className='main-container'>
                <h1>Bacteria Col</h1>
                <Grid 
                    grid={grid}
                    setGrid={setGrid}
                />
                <Controls 
                    isRunning={isRunning}
                    setIsRunning={setIsRunning}
                />
            </div>
        </div>
    )
}

export default App;