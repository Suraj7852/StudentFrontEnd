import axios from 'axios';
import {StudentType} from "./Student";

export const getStudents = () => {
    return axios.get('http://localhost:8080/students');
}

export const addStudents = (data: StudentType) => {
    return axios.post('http://localhost:8080/students', data);
}

export const removeStudent = (id: string | undefined) => {
    return axios.delete(`http://localhost:8080/students/${id}`);
}

export const openStudent = (id: string | undefined) => {
    return axios.get(`http://localhost:8080/students/${id}`);
}

export const updateStudent = (id: string | undefined, data: StudentType) => {
    return axios.put(`http://localhost:8080/students/${id}`, data)
}


