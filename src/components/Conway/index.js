import { useState } from 'react';
import {
  STATUS_PAUSED,
  STATUS_RUNNING,
  INTERVAL_SPEED_MS
} from
'./constants';
import {
  GRID_HEIGHT_CELLS,
  GRID_WIDTH_CELLS
} from '../../constants';
import ApplicationRow from '../ApplicationRow';
import ConwayButtons from '../ConwayButtons';
import Grid from '../Grid';
import useInterval from '../../hooks/useInterval';

const createMatrix = (height, width, fillValue) => {
  return Array.from({length: height}, () => 
    Array.from({length: width}, () => fillValue)
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
  const [generationCount, setGenerationCount] = useState(0);
  const [grid, setGrid] = useState(
    createMatrix(GRID_HEIGHT_CELLS, GRID_WIDTH_CELLS, false)
  );

  useInterval(() => {
    updateGridOneStep();
  }, gameStatus === STATUS_RUNNING ? INTERVAL_SPEED_MS : null);

  const cellClickHandler = (rowIdx, colIdx) => {
    const gridCopy = [...grid];
    gridCopy[rowIdx][colIdx] = !gridCopy[rowIdx][colIdx];
    setGrid(gridCopy);
  };

  const updateGridOneStep = () => {
    const gridCopy = createMatrix(GRID_HEIGHT_CELLS, GRID_WIDTH_CELLS, false);
    for (let i = 0; i < grid.length; ++i) {
      for (let j = 0; j < grid[i].length; ++j) {
        const isAlive = grid[i][j];
        const numAliveNeighbors = countAliveNeighbors(grid, i, j);
        if (!isAlive && numAliveNeighbors === 3) {
          gridCopy[i][j] = true;
        } else if (isAlive && (numAliveNeighbors < 2 || numAliveNeighbors > 3)) {
          gridCopy[i][j] = false;
        } else {
          gridCopy[i][j] = grid[i][j];
        }
      }
    }
    setGrid(() => gridCopy);
    setGenerationCount(prevGenCount => prevGenCount + 1);
  };

  const stepBtnHandler = () => {
    updateGridOneStep();
  };

  const runBtnHandler = () => {
    setGameStatus(STATUS_RUNNING);
  };

  const stopBtnHandler = () => {
    setGameStatus(STATUS_PAUSED);
  };

  return (
    <div>
        <Grid grid={grid} cellClickHandler={cellClickHandler}/>
        <ApplicationRow>
          Generation #{generationCount}
        </ApplicationRow>
        <ApplicationRow>
          <ConwayButtons gameStatus={gameStatus} actions={[stepBtnHandler, runBtnHandler, stopBtnHandler]}/>
        </ApplicationRow>
    </div>
  );
}
  
export default Conway;
  