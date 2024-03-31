// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJob, updateJob, saveJob } from "../services/JobServices";

function JobForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [jobResponse, setJobResponse] = useState('');
    const [job, setJob] = useState({
        jobTitle: '',
        jobSkills: '',
        jobDescription: '',
        previousExperience: '',
        salaryRange: '',
        company: '',
        jobLocation: '',
        jobType: ''
    });

    useEffect(() => {
        if (id) {
            console.log("Fetching job with ID:"+ id);
            getJob(id)
                .then(response => {
                    console.log("Job details:", response.data);
                    const { jobTitle, jobSkills, jobDescription, previousExperience, salaryRange, company, jobLocation, jobType } = response.data;
                    setJob({
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
                    console.log("Error fetching job:", error);
                    setJobResponse("Error fetching job: " + error.message);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob({ ...job, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) { 
            console.log("Updating Job with ID =", id);
            updateJob(id, job)
                .then(response => {
                    console.log("Update job response =", response.data);
                    setJobResponse("Successfully Updated Job " + id);
                })
                .catch(error => {
                    console.error('Error updating job:', error);
                    setJobResponse("Failed to Update Job: " + error.message);
                });
        } else { 
            console.log("Creating a new Job");
            saveJob(job)
                .then(response => {
                    console.log("Create job response =", response.data);
                    if (response.data && response.data.id) {
                        setJobResponse("Successfully Created Job. ID No is = " + response.data.id);
                    } else {
                        console.error('Error creating job: Missing ID in response');
                        setJobResponse("Failed to Create Job: Missing ID in response");
                    }
                })
                .catch(error => {
                    console.error('Error creating job:', error);
                    setJobResponse("Failed to Create Job: " + error.message);
                });
        }
    };

    function viewAllJobs() {
        navigate('/Job');
    }

    function resetForm() {
        setJob({
            jobTitle: '',
            jobSkills: '',
            jobDescription: '',
            previousExperience: '',
            salaryRange: '',
            company: '',
            jobLocation: '',
            jobType: ''
        });
    }

    function pageTitle() {
        return id ? "Update Job" : "Create Job";
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
                                <td colSpan="2" align="center"><h1>{pageTitle()}</h1></td>
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
                                <td><label>Company Name:</label></td>
                                <td><input type="text" name="company" value={job.company} onChange={handleChange} /></td>
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
                                    <button type="button" onClick={resetForm}>Reset</button>
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