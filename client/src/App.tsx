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
    for (let i = 0; i < cols; i++) {
        grid[i] = []
        for (let j = 0; j < rows; j++) {
            grid[i][j] = false
        }
    }
    return grid
}

/*
    searches for an empty adjacent cell from every bacteria occupied cell and updates 
    the grid with the inserted bacteria, then returns the updated grid
    time complexity O(n^2)
*/
const updateGrid = (grid: boolean[][]): boolean[][] => {
    // create copy of grid by mapping each nested array, then use slice to copy array
    const newGrid = grid.map(row => row.slice())

    // iterate through grid columns and rows
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
    const [rows, setRows] = useState<number>(20)
    const [cols, setCols] = useState<number>(20)
    const [grid, setGrid] = useState<boolean[][]>(createGrid(rows, cols))

    const [isRunning, setIsRunning] = useState<boolean>(false)
    const [selectedMultiplier, setSelectedMultiplier] = useState(1)
    const [interval, setInterval] = useState<number>(1000)
    
    const timerID = useRef<number | null>(null)

    // update timerID when interval changes
    useEffect(() => {
        timerID.current = interval
    }, [interval])
    

    // starts updating grid or clears the interval when simulation starts/stops or the interval changes
    useEffect(() => {
        // clear interval with the current timerID if there is one
        if (timerID.current !== null) {
            clearInterval(timerID.current)
        }
        // if the simulation is running, run updateGrid with the grid
        if (isRunning) {
            // runs defined instructions every interval (ms) and stores timerID in timerID.current
            timerID.current = window.setInterval(() => {
                setGrid((prevGrid) => updateGrid(prevGrid))
            }, interval)
        }
        // clears interval when component unmounts or dependency changes
        return () => {
            if (timerID.current !== null) {
                clearInterval(timerID.current)
            }
        }
    }, [isRunning, interval, rows, cols])

    // mounts spacebar listener on render
    useEffect(() => {
        // when keyboard event 'Space' is pressed run the handleStartStop function
        const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code === 'Space') {
            // prevents component refresh
            event.preventDefault()
            handleStartStop()
        } else if (event.code === 'KeyR') {
            event.preventDefault()
            handleReset()
        }
    }
        // adds the spacebar event listener
        window.addEventListener('keydown', handleKeyDown)
        // removes the event listner when unmounting 
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    // sets the isRunning state to start or stop running T/F
    const handleStartStop = () => {
        setIsRunning(prevIsRunning => !prevIsRunning)
    }

    // resets the simulation and creates new grid
    const handleReset = () => {
        setIsRunning(false)
        if (timerID.current !== null) {
            clearInterval(timerID.current)
            timerID.current = null // reset timerID to null
        }
        setGrid(createGrid(rows, cols))
    }

    // change the interval change from selection options
    const handleIntervalChange = (multiplier: number) => {
        // **DIVIDE TO SPEED UP INTERVAL** NOT MULTPLY (SLOWS/INCREASES INTERVAL) so dumb
        setInterval(1000 / multiplier)
        // update the selected multplier value in Controls component
        setSelectedMultiplier(multiplier)
    }

    // handles grid dimension change and sets rows, cols and new grid with dimensions, then resets simulation
    const handleGridSizeChange = (numOfRows: number, numOfCols: number) => {
        setRows(numOfRows)
        setCols(numOfCols)
        setGrid(createGrid(numOfRows, numOfCols))
        handleReset()
    }

    return (
        <div className='app'>
            <div className='main-container'>
                <h1>Cell Growth Simulator</h1>
                <Grid 
                    grid={grid}
                    setGrid={setGrid}
                />
                <Controls 
                    isRunning={isRunning}
                    selectedMultiplier={selectedMultiplier}
                    handleStartStop={handleStartStop}
                    handleReset={handleReset}
                    handleIntervalChange={handleIntervalChange}
                    handleGridSizeChange={handleGridSizeChange}
                    rows={rows}
                    cols={cols}
                />
            </div>
        </div>
    )
}

export default App;