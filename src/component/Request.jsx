import React, { useState } from 'react';
import './Req.css';
import { Link } from 'react-router-dom';
import Array from './Data';
import que from './Ques';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';




function Request() {
 
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  }
  const handledisplayChange = (e) => {
    setInputValue(e.target.value);
  }
  // const handleDeleteTodo = (index) => {
  //   const updatedTodos = [...todos];
  //   updatedTodos.splice(index, 1);
  //   setTodos(updatedTodos);
  // };
  const handleDeleteTodo = (index) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  };
  

  const obj = {
    branchcode:'',
  branchname:'',
  customeraccounttype:'',
  customername:'',
  customeraccountnumber:'',
  }

 const [formdata,setFormdata]=useState(obj);

 function handleUpload() {
  localStorage.setItem('formdata', JSON.stringify(formdata));
  alert('Upload successfully!');
  setProceed(true);
}

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata((draft)=>({...draft,[name]:value}));
  }
  const [proceed, setProceed] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const[selectFiles,setSelectedFiles]=useState([])
  
  const [selectedAccountNumber, setSelectedAccountNumber] = useState(false);

  
  const handleAccountNumberClick = (accountNumber) => {
    setSelectedAccountNumber(accountNumber);
  };
  const filteredAccounts = Array.filter(
    (account) => account.customeraccountnumber === selectedAccountNumber
  );
  const[questions,setQuestion]=useState(que)
   


  const handleAnswerChange = (index, selectedAnswer) => {
    if (index >= 0 && index < que.length) {
      const question = que[index];
      console.log(question.answer, selectedAnswer);
      if (question.answer === selectedAnswer) {
        const updated = [...que];
        updated[index].answers = selectedAnswer;
        if (updated[index + 1]) {
          updated[index + 1].isVisible = true;
        }
        if(index === que.length-1){
          setUploadbox(true)
        }
        setQuestion(updated);
      } else {
        alert('Service Gesture Policy');
      }
    }
  };
  const[uploadbox,setUploadbox]=useState(false)
    
 




            



  return (
    <div className='req'>
      <div className='req container'>
        <div className='request'>
          <div className='head'>
            <h2>REQUEST FORM</h2>
          </div>
          <div className='linkdash'>
            <Link to='/'>DASHBOARD</Link> / REQUEST FORM
          </div>
        </div>
        <div className='form_data'>
          <div className='requestform'>
            <div className="form_input">
              <label htmlFor="">Branch Code*</label>
              <div>
                <input
                  className='inputs'
                  type="text"
                  name="branchcode"
                  value={formdata.branchcode}
                  onChange={(e)=>handleInputChange(e)}
              
                />
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="">Branch Name*</label>
              <div>
                <input
                  className='inputs'
                  type="text"
                  name="branchname"
                  
                  value={formdata.branchname}
                  onChange={(e)=>handleInputChange(e)}
              
               
                />
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="">Customer Name*</label>
              <div>
                <input
                  className='inputs'
                  type="text"
                  name="customername"
                 
                  value={formdata.customername}
                  onChange={(e)=>handleInputChange(e)}
              
                
                
                />
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="">Customer Account Number*</label>
              <div>
                <input
                  className='inputs'
                  type="number"
                  name="customeraccountnumber"

                  value={formdata.customeraccountnumber}
                     onChange={(e)=>handleInputChange(e)}
              
                 
                  onClick={(e) => handleAccountNumberClick(e.target.value)}
                />
              </div>
            </div>
            <div className="form_input">
              <label htmlFor="">Customer Account Type*</label>
              <div>
                <select className='input-select' name="customeraccounttype"  onChange={(e)=>handleInputChange(e)} >
                  <option value="">--select--</option>
                  <option value="">SA</option>
                  <option value="">CA</option>
                  <option value="">SA-NRI</option>
                  <option value="">SA-NRO</option>
                  
                </select>
              </div>
            </div>
          </div>
      

          {selectedAccountNumber && (
            <div className='table-req'>
              <h2 className='h2-req'>Previous approved compensation claim</h2>
              <table>
                <thead>
                  <tr>
                    <th>Requested on</th>
                    <th>Compensation Amount(Rs.)</th>
                    <th>Reason For Compensation</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.map((account) => (
                    <tr key={account.id}>
                      <td>{account.requestedOn}</td>
                      <td>{account.compensation}</td>
                      <td>{account.reason}</td>
                      <td>{account.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
{que.map((quest, index) => {
             console.log(quest);
             return (
          <>
            {quest.isVisible && (
              <div className='form-questions' key={index}>
                <div className='questions'><p>{quest.question}</p></div>
                <div className='choose-options'>
                <label>
                  <input
                    type="radio"
                    value="Yes"
                    checked={quest.answers=== true}
                    onChange={() => handleAnswerChange(index, true)}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    checked={
                      quest.answers === false
                    }
                    onChange={() => handleAnswerChange(index, false)}
                  />
                  No
                </label>
                </div>
              </div>
            )}
          </>
        );
      })}

        {   uploadbox&&(
          
          <div className='upload_data'>
            <p>Please Upload Your Compensation Letter*</p>
            <div className='upload_box_data'>
              <div className='upload_box'>
                <input type='file'/>
              </div>
              <div className='uploadbutton'>
                <button onClick={handleUpload}>Upload</button>
              </div>
            </div>
            <ul className='up-ul'>
              <li>Upload a maximum of five files</li>
              <li>Each with a maximum of 2 MB</li>
              <li>Allowed file types of doc,pdf and excel</li>
            </ul>
          </div> 

        )
        }
{proceed && (
            
              <div className='proceed_data'>
                <button className='proceed-button' onClick={() => setNextPage(true)}>
                  Proceed to continue
                </button>
              </div>
            )}
        

        </div>
      </div>
        <div className='next-div'>  
          {nextPage && (
            <div className='next_data'>
              <div className='form_date'>
                <label>Date of Complaint(DD/MM/YY)*</label>
                <input type='date' />
              </div>
              <div className='form_date'>
                <label>Date of occurence of incident(DD/MM/YY)*</label>
                <input type='date' />
              </div>
              <div className='form_date'>
                <label>Date of Identification of incident(DD/MM/YY)*</label>
                <input type='date' />
              </div>
              <div className='form_date'>
                <label>Debit GL a/c</label>
                <input type='number' placeholder='516141108' />
              </div>
              <div className='form_date'>
                <label>Brief description of the incident*</label>
                <textarea name="" id="" cols="30" rows="10" placeholder='Brief description of the Incident'></textarea>
              </div>

              <div className='form_date'>
                <label>Reason for compensation*</label>
                <textarea name="" id="" cols="30" rows="10" placeholder='Reason for compensation'></textarea>
              </div>
              <div className='form_date'>
                <label>Compensation claimed (Rs.)*</label>
                <input type="number" placeholder='Compensation Claimed (Rs)' />
              </div>
              <div className='form_date'>
                <label>Attachment</label>
                <input type="file" />
              </div>
              <div className='form_date'>
                <label>Recommender Name*</label>
                <div className='todo-input'>
        <input
          placeholder='Enter a name or email address' 
          type='text'
          value={inputValue}
          onChange={handledisplayChange}
        />
        </div>
      <div className='app'>
      <div className='container'>
      
        
        <ul className='todo-list'>
          {todos.map((todo, index) => (
            <li key={index}>
              <span>{todo}</span>
              <FontAwesomeIcon
                icon={faTrash}
                className='delete-icon'
                onClick={() => handleDeleteTodo(index)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>

              </div>
              <button   className='add_button' onClick={handleAddTodo}> +</button>
              
            </div>
          )}
          </div>
          <div className='final'></div>
    </div>
    
  );
}



    
     


export default Request;












