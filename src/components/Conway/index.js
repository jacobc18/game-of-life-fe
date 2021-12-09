import { useState } from 'react';
import ApplicationRow from '../ApplicationRow';
import ConwayButtons from '../ConwayButtons';
import Grid from '../Grid';
import {
  STATUS_PAUSED
} from
'./constants';
import {
  GRID_HEIGHT_CELLS,
  GRID_WIDTH_CELLS
} from '../../constants';
// import './index.css';

const createMatrix = (height, width, fillValue) => {
  return Array.from({length: height}, () => 
    Array.from({length: width}, () => false)
  );
};

const countAliveNeighbors = (grid, r, c) => {
  let count = 0;
  for (let i = r - 1; i <= r + 1; ++i) {
    for (let j = c - 1; j <= c + 1; ++j) {
      if (i >= 0 && i < grid.length && j >= 0 && j < grid[i].length && (i !== r || j !== c) && grid[i][j]) {
        ++count;
      }
    }
  }

  return count;
};

function Conway() {
  const [gameStatus, setGameStatus] = useState(STATUS_PAUSED);
  const [grid, setGrid] = useState(
    createMatrix(GRID_HEIGHT_CELLS, GRID_WIDTH_CELLS, false)
  );

  const cellClickHandler = (rowIdx, colIdx) => {
    const gridCopy = [...grid];
    gridCopy[rowIdx][colIdx] = !gridCopy[rowIdx][colIdx];
    setGrid(gridCopy);
  };

  const updateGridOneStep = () => {
    const gridCopy = [...grid];
    for (let i = 0; i < grid.length; ++i) {
      for (let j = 0; j < grid[i].length; ++j) {
        const isAlive = grid[i][j];
        const numAliveNeighbors = countAliveNeighbors(grid, i, j);
        if (!isAlive &&  numAliveNeighbors === 3) {
          gridCopy[i][j] = !isAlive;
        } else if (isAlive && (numAliveNeighbors < 2 || numAliveNeighbors > 3)) {
          gridCopy[i][j] = !isAlive;
        }
      }
    }
    setGrid(gridCopy);
  };

  const stepBtnHandler = () => {
    updateGridOneStep();
  };

  // debugging tool
  const gridCountLogger = () => {
    for (let i = 0; i < grid.length; ++i) {
      let out = '';
      for (let j = 0; j < grid[i].length; ++ j) {
        out += countAliveNeighbors(grid, i, j) + ' ';
      }
      console.log(out);
    }
  };

  return (
    <div>
        grid-fe
          <Grid grid={grid} cellClickHandler={cellClickHandler}/>
          <ApplicationRow>
            <ConwayButtons actions={[stepBtnHandler]}/>
        </ApplicationRow>
    </div>
  );
}
  
export default Conway;
  