# Cell Growth Simulator

Displays and simulates bacterial cell division on a petri dish, 20x20 cell grid.


## Features

- Start, pause and reset simulation.
- User can change grid scale (Height x Width custom metrics).
- Cell division interval speed multiplier (x0.25, x0.5, x0.75, x1, x2, x4, x8).
- Buttons to start, pause and reset the simulation.
- Spacebar start/pause functionality.
- Click on cell to insert or remove bacteria from grid.

&nbsp;

## Technology

- React
- Typescript
- NodeJS
- CSS
- npm (node package manager)

&nbsp;

## Setup

### `Run app`

change into client directory
- cd client

use the npm script to run the app
- npm start

&nbsp;

## Controls

keyboard controls
- spacebar to start/stop the simulation
- 'r' to reset the simulation

&nbsp;

## Components

### Grid

The `Grid` component renders the cells of the 2D grid.

- props
    - `grid`: (boolean[][]) the grid.
    - `setGrid`: (React.Dispatch<React.SetStateAction<boolean[][]>>) updates the grid.


### Cell

The `Cell` component deals with the functionality of each individial cell that has an boolean to indicate occupancy. The cell can also be clicked to change the occupancy state.

- props
    - `occupied`: (boolean) indicates cell occupany.
    - `onClick`: (React.MouseEventHandler<HTMLDivElement>) handles the click on cells.


### Controls

The `Controls` component contains the UI to control the start, stop, reset and set buttons. This component is underneath the grid component.

- props
    - `isRunning`: (boolean) indicates if the simulation is running
    - `selectedMultiplier`: (number) represents the simulation speed multiplier value
    - `handleStartStop`: (function) starts and stops the simulation by inversing the isRunning value
    - `handleReset`: (function) resets the simulation by creating a new grid
    - `handleIntervalChange`: (multiplier: number) deals with the interval change from select value
    - `handleGridSizeChange`: (numOfRows: number, numOfCols: number) deals with the grid size changes from input
    - `rows`: (number) the grid row dimension
    - `cols`: (number) the grid column dimension

&nbsp;

## _REQUIREMENTS:_

    GRID REPRESENTATION - create a grid layout 20x20 (initial)
    -> 2D array of cell type
    -> include a method to select a custom grid size and set the grid to the custom grid size

    GROWTH RULES - create cell object and functionality for grid cells
    -> checks for adjacent spaces (up, down, left, right) to divide to
    -> contains occupied flags (boolean), if true: bacteria is there, false: no bacteria
    -> if cell is occupied for 1 second, it divides into another cell

    USER CONTROLS - create simulation user controls
    -> start, pause, reset simulation buttons
    -> input field to set when cells divide
    -> clickable grids/cells to add/remove bacteria in the grid

## _PROBLEMS_

### **Problem 1**

    how do I choose which direction for the cell to duplicate?
    what if two cells wanted to divide to the same space?

### **Problem 2** 
    how do I start/pause the simulation?

### **Problem 3** 
    what would keyboard navigation do and look like?

### **Problem 4** 
    what would a fast/optimal solution be to finding and dividing each cell

## _SOLUTIONS_

### **Problem 1 solution**
        cells wont divide at the same exact time, and will initialize the spot before the other
        cell divides, so the space would be flagged as occupied and no collision would occur.

        solution: since you iterate through each cell individually and then add a cell, there wont be a collision or competing cell spot.
    
### **Problem 2 solution**
        maybe create a global clock and the cells base their division times based on the clock.

        solution: use the built in interval function to run a function every interval (ms).
    
### **Problem 3 solution**
        maybe use spacebar as a start and pause action listener?

        solution: added eventlistener to carry out functions similar to the start, stop, reset and set buttons.
    
### **Problem 4 solution**
        randomization? data-structure? math?
        
        solution: check up, down, left, right neightbouring cells and then see if they are empty.
