
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJob, updateJob, saveJob } from "../services/JobServices";

function UserJobOutput() {
    const navigate = useNavigate();
    const [jobResponse, setJobResponse] = useState('');
    const { id } = useParams();

    const [userJobOutput, setUserJobOutput] = useState({
        jobTitle: '',
        jobSkills: '',
        jobDescription: '',
        previousExperience: '',
        salaryRange: '',
        companyName: '',
        jobLocation: '',
        jobType: ''
    });

    useEffect(() => {
        if (id) {
            console.log("The Job id Edit =", id);
            getJob(id)
                .then(response => {
                    console.log(response);
                    const { jobTitle, jobSkills, jobDescription, previousExperience, salaryRange, company, jobLocation, jobType } = response.data;
                    setUserJobOutput({
                        jobTitle,
                        jobSkills,
                        jobDescription,
                        previousExperience,
                        salaryRange,
                        company,
                        jobLocation,
                        jobType
                    });
                })
                .catch(error => {
                    console.log("Error in edit job =", error);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserJobOutput({ ...userJobOutput, [name]: value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            console.log("Update Job id =", id);
            updateJob(id, userJobOutput).then(response => {
                console.log("Update the job response = " + response.data);
                setJobResponse("Successfully Updated Job " + response.data.id);
            }).catch(error => {
                console.error('Error:', error);
                setJobResponse("Failed to Update Job " + error);
            });
        } else {
            console.log("Create Job id =" ,id);
            saveJob(userJobOutput).then(response => {
                console.log("Create the job response = " + response.data.id);
                setJobResponse("Successfully Created Job =" + response.data.id);
            })

                .catch(error => {
                    console.error('Error:', error);
                    setJobResponse("Failed to Create Job " + error);
                });
        }
    };

    function viewAllJobs() {
        navigate('/Job');
    }

    
    return (
        <div className="App">
            <div className="form-container2">
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td colSpan="2" align="center"><h5>{jobResponse}</h5></td>
                            </tr>
                            <tr>
                                <td colSpan="2" align="center"><h1>User Job Result</h1></td>
                            </tr>

                            <tr>
                                <td><label>Job Title:</label></td>
                                <td><input type="text" name="jobTitle" value={userJobOutput.jobTitle} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td><label>Job Skills:</label></td>
                                <td><input type="text" name="jobSkills" value={userJobOutput.jobSkills} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td><label>Job Description:</label></td>
                                <td><input type="text" name="jobDescription" value={userJobOutput.jobDescription} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td><label>Previous Experience:</label></td>
                                <td><input type="text" name="previousExperience" value={userJobOutput.previousExperience} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td><label>Salary Range:</label></td>
                                <td><input type="number" name="salaryRange" value={userJobOutput.salaryRange} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td><label>Company Name:</label></td>
                                <td><input type="text" name="companyName" value={userJobOutput.companyName} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td><label>Job Location:</label></td>
                                <td><input type="text" name="jobLocation" value={userJobOutput.jobLocation} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td><label>Job Type:</label></td>
                                <td><input type="text" name="jobType" value={userJobOutput.jobType} onChange={handleChange} /></td>
                            </tr>
                           
                            <tr>
                                <td colSpan="2" align="center">
                                    <button type="submit">Apply</button>
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

export default UserJobOutput;
