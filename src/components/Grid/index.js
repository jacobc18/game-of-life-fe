import { useState } from 'react';
import Cell from '../Cell';
import { GRID_HEIGHT_CELLS, GRID_WIDTH_CELLS } from '../../constants';
import './index.css';

function Grid() {
  const [grid, setGrid] = useState(
    Array.from({length: GRID_HEIGHT_CELLS}, () => 
      Array.from({length: GRID_WIDTH_CELLS}, () => false)
    )
  );

  const handleCellClick = (rowIdx, colIdx) => {
    const gridCopy = [...grid];
    gridCopy[rowIdx][colIdx] = !gridCopy[rowIdx][colIdx];
    setGrid(gridCopy);
  };

  return (
    <div className="grid">
        {grid.map((cellRow, rowIdx) => {
          return (
            <div key={`cell-row-${rowIdx}`}>
              {cellRow.map((cell, colIdx) => {
                return <Cell 
                  key={`cell-${rowIdx}-${colIdx}`}
                  row={rowIdx}
                  column={colIdx}
                  isAlive={cell}
                  onClick={() => {
                    handleCellClick(rowIdx, colIdx);
                  }}/>
              })}
            </div>
          )
        })}
    </div>
  );
}

export default Grid;
