### `Function`

Displays and simulates bacterial cell division on a petri dish, 20x20 cell grid.
Start, pause and reset simulation.

### `Features`

User can change grid scale (Height x Width custom metrics).
Cell division interval speed multiplier (x0.25, x0.5, x0.75, x1, x2, x4, x8).
Buttons to start, pause and reset the simulation.
Spacebar start/pause functionality.
Click on cell to insert or remove bacteria from grid.


## Script to run app

In the project directory, run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Technology

React and TypeScript






__NOTES__
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

**PROBLEM 1** 
    how do I choose which direction for the cell to duplicate?
    what if two cells wanted to divide to the same space?

**PROBLEM 2** 
    how do I start/pause the simulation?

**PROBLEM 3** 
    what would keyboard navigation do and look like?

**PROBLEM 4** 
    what would a fast/optimal solution be to finding and dividing each cell

__IDEAS/SOLUTIONS__
    PROBLEM 1
        cells wont divide at the same exact time, and will initialize the spot before the other
        cell divides, so the space would be flagged as occupied and no collision would occur
    
    PROBLEM 2
        maybe create a global clock and the cells base their division times based on the clock
    
    PROBLEM 3
        maybe use spacebar as a start and pause action listener?
    
    PROBLEM 4
        randomization? data-structure? math?