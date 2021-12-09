import Cell from '../Cell';

function Grid({grid, cellClickHandler = () => {}}) {
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
                    cellClickHandler(rowIdx, colIdx);
                  }}/>
              })}
            </div>
          )
        })}
    </div>
  );
}

export default Grid;
