import React, { SetStateAction, useState } from 'react';
import './Controls.css'

// control props from App
interface ControlProps {
    isRunning: boolean;
    selectedMultiplier: number;
    handleReset: () => void;
    handleStartStop: () => void;
    handleIntervalChange: (multiplier: number) => void;
    handleGridSizeChange: (numOfRows: number, numOfCols: number) => void;
    rows: number;
    cols: number;
}

/* 
    simulation control component of the simulation, start, stop, pause, change interval selection
*/
const Controls: React.FC<ControlProps> = ({ isRunning, selectedMultiplier, handleStartStop, handleReset, handleIntervalChange, handleGridSizeChange, rows, cols }) => {
    const [numOfRows, setNumOfRows] = useState<number>(rows)
    const [numOfCols, setNumOfCols] = useState<number>(cols)
    
    // change the interval change from selection options
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // convert to float and set the multiplier and interval
        const multiplier = parseFloat(event.target.value)
        handleIntervalChange(multiplier)
    }

    // takes the event and setter, setNumOfRows or setNumOfCols to update the useState variable
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<SetStateAction<number>>) => {
        // convert input string into integer
        const value = parseInt(event.target.value)
        setter(value)
    }

    // handles grid size set
    const handleSetClick = () => {
        handleGridSizeChange(numOfRows, numOfCols)
    }

    return (
        <div className='controls-container'>
            <div className='controls-menu-container'>
                <div className='simulation-run-controls-container'>
                    <button className='reset-button' onClick={handleReset}>reset</button>
                    <button className={isRunning ? 'stop-button' : 'start-button'} onClick={handleStartStop}>
                        {isRunning ? 'stop' : 'start'}
                    </button>
                </div>
                <div className='interval-select-speed-container'>
                    <label>speed: &nbsp;</label>
                    <select className='interval-speed-select' value={selectedMultiplier} onChange={handleChange}>
                        <option value={8}>x8</option>
                        <option value={4}>x4</option>
                        <option value={2}>x2</option>
                        <option value={1}>x1</option>
                        <option value={0.5}>x0.5</option>
                        <option value={0.25}>x0.25</option>
                    </select>
                </div>
                <div className='grid-size-input-container'>
                    <label>size:</label>
                    <input 
                        className='grid-size-input'
                        type='number'
                        required
                        value={numOfRows}
                        onChange={event => handleInputChange(event, setNumOfRows)}
                    />
                    x
                    <input 
                        className='grid-size-input'
                        type='number'
                        required
                        value={numOfCols}
                        onChange={event => handleInputChange(event, setNumOfCols)}
                    />
                </div>
                <div className='grid-size-set-button-container'>
                    <button className='grid-size-set-button' onClick={handleSetClick}>set</button>
                </div>
            </div>
        </div>
    );
};

export default Controls;