import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getAllJobs, deleteJob as deleteJobService } from '../services/JobServices';

const ListAllJobs = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        console.log("Get All Jobs");
        getAllJobs()
            .then(response => {
                console.log(response.data);
                setJobs(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const buttonClickHandler = () => {
        navigate("/createJobs");
    };

    const editUpdateJob = (id) => {
        console.log("edit and update job id ="+ id);
        navigate(`/createJobs/${id}`);
    };

    const handleDeleteJob = (id) => {
        console.log("delete job id ="+ id);
        deleteJobService(id).then(response => {
                console.log("delete job response =", response.data);
                setJobs(jobs.filter(job => job.id !== id));
            })
            .catch(error => {
                console.log("Error =", error);
            });
    };

    return (
        <div className="container bg-white text-dark">
            <div className="table-container">
                <div className="header-container">
                    <h1>Jobs List</h1>
                </div>
                <div className="btn-container">
                    <button className="btn btn-primary" onClick={buttonClickHandler} name="Create Jobs">Create Jobs</button>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Job Title</th>
                            <th>Job Skills</th>
                            <th>Job Description</th>
                            <th>Previous Experience</th>
                            <th>Salary Range</th>
                            <th>Company Name</th>
                            <th>Job Location</th>
                            <th>Job Type</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map(job => (
                            <tr key={job.id}>
                                <td>{job.id}</td>
                                <td>{job.jobTitle}</td>
                                <td>{job.jobSkills}</td>
                                <td>{job.jobDescription}</td>
                                <td>{job.previousExperience}</td>
                                <td>{job.salaryRange}</td>
                                <td>{job.company}</td>
                                <td>{job.jobLocation}</td>
                                <td>{job.jobType}</td>
                                <td><button onClick={() => editUpdateJob(job.id)}>Edit</button></td>
                                <td><button onClick={() => handleDeleteJob(job.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListAllJobs;



