// JobServices.js

import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/v1/";

export const getAllJobs = () => axios.get(REST_API_BASE_URL + "getAllJobs");

export const saveJob = (job) => axios.post(REST_API_BASE_URL + "saveJob", job);

export const getJob = (jobId) => axios.get(REST_API_BASE_URL + "getJob/" + jobId);

export const updateJob = (jobId, job) => axios.put(REST_API_BASE_URL + "updateJob/" + jobId, job);

export const deleteJob = (jobId) => axios.delete(REST_API_BASE_URL + "deleteJob/" + jobId);

export const saveUserJob = (UserJob) => axios.post(REST_API_BASE_URL + "saveUserJob", UserJob);

