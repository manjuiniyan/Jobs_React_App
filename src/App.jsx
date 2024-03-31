
import './App.css';
import JobForm from './components/JobForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListAllJobs from './components/ListAllJobs';
import ErrorComponent from './components/ErrorComponent';
import UserJobSearch from './components/UserJobSearch';
import UserJobOutput from './components/UserJobOutput';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={<ListAllJobs />}></Route>

          <Route path='/Job' element={<ListAllJobs />} errorElement={<ErrorComponent />} ></Route>

          <Route path='/createJobs' element={<JobForm />}></Route>

          <Route path='/createJobs/:id' element={<JobForm />}></Route>

          <Route path='/userJobSearch' element={<UserJobSearch />}></Route>

          <Route path='/userJobOutput' element={<UserJobOutput />}></Route>

        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
