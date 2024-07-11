import React from 'react';
import './Controls.css'

// control props from App
interface ControlProps {
    isRunning: boolean;
    selectedMultiplier: number;
    handleStartStop: () => void;
    handleIntervalChange: (multiplier: number) => void;
    handleReset: () => void;
}

/* 
    simulation control component of the simulation, start, stop, pause, change interval selection
*/
const Controls: React.FC<ControlProps> = ({ isRunning, selectedMultiplier, handleStartStop, handleIntervalChange, handleReset }) => {
    // change the interval change from selection options
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // convert to float and set the multiplier and interval
        const multiplier = parseFloat(event.target.value)
        handleIntervalChange(multiplier)
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
            </div>
        </div>
    );
};

export default Controls;