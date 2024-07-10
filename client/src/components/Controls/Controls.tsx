import React from 'react';

// control props from App
interface ControlProps {
    isRunning: boolean;
    selectedMultipier: number;
    handleStartStop: () => void;
    handleIntervalChange: (multiplier: number) => void;
    
}

/* 
    simulation control component of the simulation, start, stop, pause, change interval selection
*/
const Controls: React.FC<ControlProps> = ({ isRunning, selectedMultipier, handleStartStop, handleIntervalChange }) => {
    // change the interval change from selection options
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // convert to float and set the multiplier and interval
        const multiplier = parseFloat(event.target.value)
        // **DIVIDE TO SPEED UP INTERVAL** NOT MULTPLY (SLOWS/INCREASES INTERVAL) so dumb
        handleIntervalChange(multiplier)
        console.log(multiplier)
    }

    return (
        <div className='controls-container'>
            <div className='simulation-run-controls-container'>
            <button className="start-stop-button" onClick={handleStartStop}>
                {isRunning ? 'Stop' : 'Start'}
            </button>
            </div>
            <div className='interval-speed-select'>
                <select value={selectedMultipier} onChange={handleChange}>
                    <option value={8}>x8</option>
                    <option value={4}>x4</option>
                    <option value={2}>x2</option>
                    <option value={1}>x1</option>
                    <option value={0.5}>x0.5</option>
                    <option value={0.25}>x0.25</option>
                </select>
            </div>
        </div>
    );
};

export default Controls;