import './index.css';

function ConwayButtons({actions, ...children}) {
    return (
      <div>
          <button className='step-btn' onClick={actions[0]}>Step</button>
      </div>
    );
  }
  
  export default ConwayButtons;
  