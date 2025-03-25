import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/expenses";

// FETCH
export const getExpenses = async () => {
    try {
        const response = await fetch(API_BASE_URL);
        const contentType = response.headers.get("content-type");
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        } else {
            throw new Error("Response is not in JSON format");
        }

    } catch (error) {
        console.error("Error fetching expenses: ", error);
        return [];
    }
};

// ADD
export const addExpense = async (expense) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/add`, expense);
        return response.data;
    } catch (error) {
        console.error("Error adding expense: ", error);
        return null;
    }
};

// UPDATE
export const updateExpense = async (expense) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, updateExpense);
        return response.data;
    } catch (error) {
        console.error("Error deleting expense: ", error);
    }
    
};

// DELETE
export const deleteExpense = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
        console.error("Error deleting expense: ", error);
    }
};