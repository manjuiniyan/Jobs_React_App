import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



function JobForm() {

    const navigate = useNavigate();
    const [jobResponse, setjobResponse] = useState([]);

    const [job, setJob] = useState({
        jobTitle: '',
        jobSkills: '',
        jobDescription: '',
        previousExperience: '',
        salaryRange: '',
        jobLocation: '',
        jobType: ''

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob({ ...job, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/v1/saveJob', job)
            .then(response => {
                console.log(response.data);
                setjobResponse(response.data);
                //Handle success
            })
            .catch(error => {
                console.error('Error:', error);
                //Handle error
            });
    };

    function viewAllJobs(){
        navigate('/Job');
    }

    return (

        <div className="App">
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td colSpan="2" align="center"><h5>{jobResponse}</h5></td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="center"><h1>Job Form</h1></td>
                        </tr>
                        
                        <tr>
                            <td><label>Job Title:</label></td>
                            <td><input type="text" name="jobTitle" value={job.jobTitle} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Job Skills:</label></td>
                            <td><input type="text" name="jobSkills" value={job.jobSkills} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Job Description:</label></td>
                            <td><input type="text" name="jobDescription" value={job.jobDescription} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Previous Experience:</label></td>
                            <td><input type="text" name="previousExperience" value={job.previousExperience} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Salary Range:</label></td>
                            <td><input type="number" name="salaryRange" value={job.salaryRange} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Job Location:</label></td>
                            <td><input type="text" name="jobLocation" value={job.jobLocation} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Job Type:</label></td>
                            <td><input type="text" name="jobType" value={job.jobType} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="center">
                                <button type="submit">Submit</button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="center">
                                <button type="button" onClick={viewAllJobs}>View All Jobs</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
        </div>
    );
}

export default JobForm;