import React from 'react';
import './Dashboard.css';
import { useState } from 'react';
import Array from './Data';
import {BsFlag} from 'react-icons/bs';
import {FiXCircle} from 'react-icons/fi';
import {Link} from 'react-router-dom'


const Dashboard = () => {
  const [data, setData] = useState(Array);
const [displayInprogress, setDisplayInprogress] = useState(false);
const [displayCompleted, setDisplayCompleted] = useState(false);


  const handleStatusFilter = (status) => {
    if (status === 'In Progress') {
      setDisplayInprogress(true);
      setDisplayCompleted(false);
    } else if (status === 'Completed') {
      setDisplayInprogress(false);
      setDisplayCompleted(true);
    } else {
      setDisplayInprogress(false);
      setDisplayCompleted(false);
    }
  };

  const filteredArray = data.filter((data) => {
    if (displayInprogress) {
      return data.status !== 'Completed';
    }
    if (displayCompleted) {
      return data.status === 'Completed';
    }
    return true;
  });
 

  
  
  return (
    <div className='main'>
      
     
      <div className='container'>
      <div className='dashboard'>
<div className='dashbrd1'><h1>DASHBOARD</h1></div>
  <button className='create-btn'><Link to={'/request'}>Create</Link></button>
{/* </div> */}
      </div>
   
     
      <div className='box-shadow'></div>
     
      <div className='main-btn1'>
        <button onClick={() => handleStatusFilter('In Progress')} className='btn1'> <FiXCircle/>Inprogress</button>
        <button onClick={() => handleStatusFilter('Completed')} className='btn2'> <BsFlag/>Completed</button>
       
        </div>
      
      
      <hr className='line' />
      <div className='search'>
        <label>Search:</label>
        <input type="text" />
        </div>
       
        
      
    <div className='table-container'>
   
      <table className='table' border={1}>
        <thead>
          <tr className='tr'>
            <th>ID</th>
            <th>Requested On</th>
            <th>Customer Name</th>
            <th>Branch Code</th>
            <th>Branch Name</th>
            <th>Customer Account Number</th>
            <th>Compensation</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className='tbody'>
          { filteredArray.map((user, index) => (
            <tr key={index}>
              <td className='id'>{user.id}</td>
              <td>{user.requestedOn}</td>
              <td>{user.customername}</td>
              <td>{user.branchcode}</td>
              <td>{user.branchname}</td>
              <td>{user.customeraccountnumber}</td>
              <td>{user.compensation}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div> 
  );
};

export default Dashboard;