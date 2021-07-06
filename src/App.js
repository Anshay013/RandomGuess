import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // importing bootstrap css
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

import { MyContext } from './context';
import Stage1 from './components/stage_1';
import Stage2 from './components/stage_2';

// we have bootstrap,css and main brain javascript

class App extends React.Component  {
  static contextType = MyContext;

  render(){
    return (
      <div className="wrapper">
       <div className="center-wrapper">
         <h1> GUESS the Looser ??</h1>
        { this.context.state.stage  === 1 ?
          <Stage1/>
          :
          <Stage2/>
        }
       </div>
      </div>
    )
  }
}

export default App;

// what is bootstrap?
/*
Bootstrap is one of the biggest advantages of using Bootstrap is the speed of development.
 If you’re looking to push out a new website or application quickly, you should definitely consider using Bootstrap.
  Rather than coding from scratch, Bootstrap enables you to utilize ready made blocks of code to help you get started.
*/
// react has a library known as react bootstrap which enables all the funs. of bootstrap