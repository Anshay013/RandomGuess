import React,{ useState, useContext, useRef } from 'react';
import { Button,Form, Alert } from 'react-bootstrap'; // importing Buttons,forms and alert from bootstrap.

/* if we only want to import button then it is something like this -->
import Button from 'react-bootstrap/Button'; note this a single button imported,if we want multiple buttons we have to keep importing it
again and again. Therefore to avoid this we import like we imported above import {.....} form 'react-bootstrap';
*/

import { MyContext } from '../context';

const Stage1 = () =>  {
  const textInput = useRef(); // creating reference of a useRef
  const context = useContext(MyContext);
  const [error,setError ] = useState([false,'']) // initiall y it is false and empty

  const submission = (e) => { /* it takes the parameter as an event i.e onSubmit(it does not take event as an argument but catches it from
                                from where the fun. is called */
    e.preventDefault();  // it prevents reloading
    const value = textInput.current.value; // value stores the text current value this is how we access it
    const validate = validateInput(value); // we call validateInput fun. passing that text.

    if(validate){
      setError([false,'']); // we set the useState error to its default value first
      context.addLoosers(value)  // we add the looser name i.e the text passed wiht help of usecontext.(addLooser is a fun. in index.js 
                                     // of components where useContext is defined.)
      textInput.current.value = '' // set current value of the form to an empty string.(clear input for nre values to come.)
    } 
  }

  const validateInput = (value) => { // its quite easy to understand
    if(value === ''){
      setError([true,'Text Cannot be Empty !!']);
      return false;
    }
    else if(value.length <= 1){
      setError([true,'Atleast 2 chars must be present !!']);
      return false;
    }
    // error is true and we need toutput some string.

    return true; // we dont set error to true and string remains empty so nothing is outputed (empty string)
  }

  console.log(context)

  return (
    <>
      <Form onSubmit={submission}  className="mt-4">{/*onSubmit is an event like onClick it triggers when we click Add Looser button*/}
        <Form.Group> {/*Form.Group is usual way of creating elements form elements on Bootstrap */}
          <Form.Control // From.Control is same as input to a form
            type="text"
            placeholder="ADD LOOSER !! "
            name="player"
            ref={textInput} // the way to access the input is through ref we add the player and now want to access it ref will 
            // help us to do so.
          />
        </Form.Group>

        { error[0] ?    <Alert variant="danger"> {error[1]} </Alert> : null } {/*Alert is just bootstrap */} 
        {/* we check it everytiumne after we have added a looser if for a particular looser error[0] == true i.e it has some vadidation
        error. We simply put up a alert of variant 'danger' and display the string(i.e msg) error[1]  */}

        <Button className="triggerb" variant="primary" type="submit"> {/*this button again comes from react bootstrap not simply from react */}
          Add Looser {/* Its a primary button of submit type */}
        </Button>{/*we click on Add Looser to trigger submission fun. via onSubmit in From tag */}

        {
         context.state.loosers && context.state.loosers.length > 0 ?
          <>
            <hr/>
            <div>
              <ul className="list-group">
                {/*after we add the loosers we scan it by mapping and displaying the added loosers in the form of list
                 as span, span has an onClick which call a removeLoosers fun. under index.js of components and remove the looser 
                 from the list and again the fun. stage re-renders and we see only the left users displayed(it mapping it done
                 everytine a user is removed*/}
                { context.state.loosers.map((item,idx)=>(
                  <li key={idx} className="list-group-item d-flex justify-content-between align-items-center list-group-item-action">
                    {item}
                    <span
                      className="badge badge-danger"
                      onClick={()=> context.removeLoosers(idx)}
                    >x</span>
                  </li>
                ))
                }
              </ul>
              {/*after atleast 2 loosers are added we can procedd by clicking on NEXT button which we have trated as a div
              it calls a next fun. again under index.js of components which changes stage to 2 and App fun. under App.js re-renders
               and we proceed to stage 2 */}
              <div
                className="action_button"
                onClick={()=> context.next() }
              >
                NEXT
              </div>
            </div>
          </>
         :null
        }
      </Form>
     
    </>
  );
}

export default Stage1;
