## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

NOTES:
    GRID REPRESENTATION - create a grid layout 20x20 (initial)
    -> 2D array of cell type
    -> include a method to select a custom grid size and set the grid to the custom grid size

    GROWTH RULES - create cell object and functionality for grid cells
    -> checks for adjacent spaces (up, down, left, right) to divide to
    -> contains occupied flags (boolean), if true: bacteria is there, false: no bacteria
    -> if cell is occupied for 1 second, it divides into another cell

    USER CONTROLS - create simulation user controls
    -> start, pause, reset simulation buttons
    -> clickable grids/cells to add/remove bacteria in the grid
    -> 

**PROBLEM 1** 
    how do I choose which direction for the cell to duplicate?
    what if two cells wanted to divide to the same space?
**PROBLEM 2** how do I start/pause the simulation?
**PROBLEM 3** what would keyboard navigation do and look like?
**PROBLEM 4** what would a fast/optimal solution be to finding and dividing each cell

IDEAS
    PROBLEM 1: 