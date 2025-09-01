import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

// Customers
export const getCustomers = () => API.get("/customers");
export const getCustomer = (id) => API.get(`/customers/${id}`);
export const createCustomer = (data) => API.post("/customers", data);
export const updateCustomer = (id, data) => API.put(`/customers/${id}`, data);
export const deleteCustomer = (id) => API.delete(`/customers/${id}`);

// Addresses
export const addAddress = (id, data) => API.post(`/customers/${id}/addresses`, data);

// Search
export const searchCustomers = (params) =>
  API.get("/customers/search", { params });
