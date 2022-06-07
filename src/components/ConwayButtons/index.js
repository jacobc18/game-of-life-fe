import './index.css';
import { STATUS_PAUSED, STATUS_RUNNING } from '../Conway/constants';

function ConwayButtons({gameStatus, actions}) {
    return (
      <div>
          <button disabled={gameStatus === STATUS_RUNNING} className='conway-btn step-btn' onClick={actions[0]}>Step</button>
          {gameStatus === STATUS_PAUSED && <button className='conway-btn run-btn' onClick={actions[1]}>Run</button>}
          {gameStatus === STATUS_RUNNING && <button className='conway-btn stop-btn' onClick={actions[2]}>Stop</button>}
          <button className='conway-btn random-btn' onClick={actions[3]}>Randomize</button>
          <button className='conway-btn interval-increment-btn' onClick={actions[4]}>Increment</button>
          <button className='conway-btn interval-decrement-btn' onClick={actions[5]}>Decrement</button>
      </div>
    );
  }
  
  export default ConwayButtons;
  