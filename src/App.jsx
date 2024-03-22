
import React from 'react';
import './App.css';
import JobForm from './components/JobForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListAllJobs from './components/ListAllJobs';
import ErrorComponent from './components/ErrorComponent';

function App() {
  return (
<>
    <BrowserRouter>
      <Routes>

            {/* comment line */}
            {/* //http://localhost:port/ */}
            <Route path='/' element={<ListAllJobs />}></Route>
            {/* http://localhost:port/employees */}
            <Route path='/Job' element={<ListAllJobs />} errorElement={<ErrorComponent/>} ></Route>
            {/* http://localhost:port/createEmployee */}
            <Route path='/createJobs' element={<JobForm/>}></Route>
          
      </Routes>
    </BrowserRouter>
    
</>
  );
}

export default App;
