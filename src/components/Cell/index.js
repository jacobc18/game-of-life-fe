import './index.css';
import {
  GRID_HEIGHT_CELLS,
  GRID_WIDTH_CELLS
} from '../../constants';

function Cell({row, column, isAlive, onClick}) {
  let className = 'cell';
  
  if (column === GRID_WIDTH_CELLS - 1) {
    className += ' cell-right-border';
  }
  if (row === GRID_HEIGHT_CELLS - 1) {
    className += ' cell-bottom-border';
  }
  if (isAlive) {
    className += ' cell-alive';
  }

  return (
    <div className={className} onClick={onClick}>
    </div>
  );
}

export default Cell;
