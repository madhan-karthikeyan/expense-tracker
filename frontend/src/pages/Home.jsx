import React, { useEffect, useState } from "react";
import { getExpenses, deleteExpense, addExpense } from "../api/expenseApi";
import AddExpenseForm from "../components/AddExpenseForm";

const Home = () => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const data = await getExpenses();
            setExpenses(data);
        } catch (error) {
            console.error("Error fetching responses: ", error);
            setExpenses([]);
        }
    };

    const handleDelete = async (id) => {
        console.log()
        try {
            await deleteExpense(id);
            fetchExpenses();
        } catch (error) {
            console.error("Error deleting expense: ", error);
        }
    };

    const handleAddExpense = async (newExpense) => {
        try {
            await addExpense(newExpense);
            fetchExpenses(); // Refresh list after adding
        } catch (error) {
            console.error("Error adding expense: ", error);
        }
    };

    return (
        <div className="p-5">
            {/* <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1> */}

            {/* Add Expense Form */}
            <AddExpenseForm onAddExpense={handleAddExpense} />

            {/* Expense List */}
            <ul className="mt-5">
                {expenses.length === 0 ? (
                    <p className="text-gray-500 text-center">No expenses found. Add some!</p>
                ) : (
                    expenses.map((expense) => (
                        <li
                            key={expense._id}
                            className="border p-3 my-2 flex justify-between rounded-lg shadow-md bg-gray-100"
                        >
                            <span>{expense.title} - ${expense.amount}</span>
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded-md"
                                onClick={() => handleDelete(expense._id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Home;
