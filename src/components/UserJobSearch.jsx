import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { saveUserJob } from "../services/JobServices";

function UserJobSearch() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [userJobResponse, setUserJobResponse] = useState('');
    const [userJobSearch, setUserJobSearch] = useState({
        skill: '',
        yearOfExperience: '',
        location: '',
        salaryRange: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserJobSearch({ ...userJobSearch, [name]: value });
    };

    const handleReset = () => {
        setUserJobSearch({
            skill: "",
            yearOfExperience: "",
            location: "",
            salaryRange: ""
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Create a User Job =", id);
        saveUserJob(userJobSearch)
            .then(response => {
                console.log("Response from saveUserJob:", response);
                setUserJobResponse("Successfully Created User Job with ID = " + response.id);
                //Redirect to User Job Output
                navigate("/UserJobOutput");

            })
            .catch(error => {
                console.error('Error:', error);
                setUserJobResponse("Failed to Create User Job: " + error.message);
            });
    };

    return (
        <div className="App">
            <div className="form-container1">
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td colSpan="2" align="center"><h5>{userJobResponse}</h5></td>
                            </tr>
                            <tr>
                                <td colSpan="2" align="center"><h1>Search Jobs</h1></td>
                            </tr>
                            <tr>
                                <td><label>Skill:</label></td>
                                <td><input type="text" name="skill" value={userJobSearch.skill} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td><label>Year Of Experience:</label></td>
                                <td><input type="text" name="yearOfExperience" value={userJobSearch.yearOfExperience} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td><label>Location:</label></td>
                                <td><input type="text" name="location" value={userJobSearch.location} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td><label>Salary Range:</label></td>
                                <td><input type="number" name="salaryRange" value={userJobSearch.salaryRange} onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td colSpan="2" align="center">
                                    <button type="submit">Submit</button>
                                    <button type="button" onClick={handleReset}>Reset</button>
        
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
}

export default UserJobSearch;
