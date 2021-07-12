import React,{ Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const MyContext = React.createContext();

class MyProvider extends Component {
    state = {
        stage:1,
        loosers:[],
        result:''
    }

    addLoosers = (name) => {
        this.setState((prevState)=>({
            loosers:[ ...prevState.loosers,name] 
            
        }))                  
    }

    removeLoosers = (idx) => {
        let newArray = this.state.loosers;
        newArray.splice(idx,1); // erase the chosen index
        this.setState({loosers:newArray});
    }

    nextHandler = () => {
        const { loosers } = this.state

        if(loosers.length < 2){
            console.log('error')
            toast.error("Atleast 2 Loosers required",{ // using react toastify to display the error the msg will be displayed as a warning
                                                         // for 2 sec as metioned (2000 ms)
                position: toast.POSITION.TOP_LEFT,    // postion of msg is at top left.
                autoClose: 2000 // autoclose the warning msg after 2 sec.
            })
        } else { // if their are atleast 2 loosers we proceed to stage2.
           this.setState({
               stage:2 // stage set to 2 App fun. re-renders
           },()=>{
               setTimeout(()=>{
                    this.generateLoosers()
               },1000)  // result displays after 1 sec.
           })
        }
    }

    generateLoosers = () => { // using random no. generator to generate random loosers
        const { loosers } = this.state;
        this.setState({
            result: loosers[Math.floor(Math.random() * loosers.length)]
        })
    }

    resetGame = () => { // resetting to original
        this.setState({
            stage:1,
            loosers:[],
            result:''
        })
    }
    

    render(){
        return(
            <>
                <MyContext.Provider value={{
                    state: this.state,
                    addLoosers: this.addLoosers,
                    removeLoosers: this.removeLoosers,
                    next: this.nextHandler,
                    getNewLoosers: this.generateLoosers,
                    resetGame: this.resetGame
                }}>
                    {this.props.children}
                </MyContext.Provider>
                <ToastContainer/>
            </>
        )
    }
}


export {
    MyContext,
    MyProvider
}
