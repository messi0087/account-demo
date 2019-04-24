import axios from 'axios'
export const api =process.env.REACT_APP_RECORDS_API_URL || "http://localhost:5000" ;

export const getALL =() =>
    axios.get(`${api}/records`);

export const create =(body) =>
    axios.post(`${api}/records`,body);

export const update= (id,body) =>
    axios.put(`${api}/records/${id}`,body);

export const remove= (id) =>
    axios.delete(`${api}/records/${id}`);
