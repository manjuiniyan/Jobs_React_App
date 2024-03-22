import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

const ListAllJobs = () => {

    const navigate = useNavigate();

    const [job, setJob] = useState([]);

    useEffect(() => {

        axios
            .get("http://localhost:8080/api/v1/getAllJobs")
            .then((response) => {
                console.log(response.data);
                setJob(response.data);
            }).catch((error) => {
                console.log(error);
            });
    }, []);

    function buttonClickHandler() {
        navigate("/createJobs");
    }

    return (
        <div className="container bg-white text-dark" >
            <h1>Jobs List</h1>
            <button className="btn btn-primary" onClick={buttonClickHandler} name="Create Jobs" > Create Jobs</button>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Job Title</td>
                        <td>Job Skills</td>
                        <td>Job Description</td>
                        <td>Previous Experience</td>
                        <td>Salary Range</td>
                        <td>Job Location</td>
                        <td>Job Type</td>
                    </tr>
                </thead>
                <tbody>

                    {
                        job.map((job) =>
                            <tr key={job.id}>
                                <td>{job.id}</td>
                                <td>{job.jobTitle}</td>
                                <td>{job.jobSkills}</td>
                                <td>{job.jobDescription}</td>
                                <td>{job.previousExperience}</td>
                                <td>{job.salaryRange}</td>
                                <td>{job.jobLocation}</td>
                                <td>{job.jobType}</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>

    );
};

export default ListAllJobs;