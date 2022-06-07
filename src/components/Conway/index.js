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
import getRandomBetween from '../../util/getRandomBetween';

const createMatrix = (height, width, fillValue) => {
  return Array.from({length: height}, () => 
    Array.from({length: width}, () => fillValue)
  );
};

const createMatrixFillFunc = (height, width, fillFunc) => {
  return Array.from({length: height}, () => 
    Array.from({length: width}, fillFunc)
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
  const [intervalOffset, setIntervalOffset] = useState(0);

  useInterval(() => {
    updateGridOneStep();
  }, gameStatus === STATUS_RUNNING ? INTERVAL_SPEED_MS + intervalOffset : null);

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

  const fillRandomHandler = () => {
    setGrid(createMatrixFillFunc(GRID_HEIGHT_CELLS, GRID_WIDTH_CELLS, () => getRandomBetween(0, 1) === 1));
  };

  const incrementIntervalHandler = () => {
    setIntervalOffset(intervalOffset + 10);
  };

  const decrementIntervalHandler = () => {
    if (INTERVAL_SPEED_MS + intervalOffset >= 11) {
      setIntervalOffset(intervalOffset - 10);
    }
  };

  return (
    <div>
        <Grid grid={grid} cellClickHandler={cellClickHandler}/>
        <ApplicationRow>
          Generation #{generationCount}
        </ApplicationRow>
        <ApplicationRow>
          Speed {INTERVAL_SPEED_MS + intervalOffset}ms
        </ApplicationRow>
        <ApplicationRow>
          <ConwayButtons gameStatus={gameStatus} actions={[stepBtnHandler, runBtnHandler, stopBtnHandler, fillRandomHandler, incrementIntervalHandler, decrementIntervalHandler]}/>
        </ApplicationRow>
    </div>
  );
}
  
export default Conway;
  