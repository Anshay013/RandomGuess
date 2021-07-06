import React,{ useContext } from 'react';

import { MyContext } from '../context';

const Stage2 = () =>  {
  const context = useContext(MyContext);

  return (
      <div className="result_wrapper">
            <h3>I am the looser</h3>
            
            <div>{context.state.result}</div> {/*displaying result */}
      
      <div className="action_button" onClick={()=>context.resetGame()}>
        START OVER
      </div>
      <div className="action_button btn_2" onClick={()=> context.getNewLoosers()} >
        GET NEW LOOSER
      </div>
    </div>
  );
}

export default Stage2;
