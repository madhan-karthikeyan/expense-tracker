import React, { useState } from "react";
import { addExpense, predictCategory } from "../api/expenseApi";

const AddExpenseForm = ({ onExpenseAdded }) => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState(""); // Now a dropdown
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(false);

    const categories = [
        "Food", "Transportation", "Household", "Subscription", "Other",
        "Investment", "Health", "Family", "Apparel", "Gift", "Education",
        "Festivals", "Tourism", "Rent", "Social Life"
    ]; // Predefined categories

    const handlePredictCategory = async () => {
        if (!title || !amount) return;

        setLoading(true);
        const predictedCategory = await predictCategory({ title, amount });
        setCategory(predictedCategory); // Set predicted category
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const expenseData = { title, amount: parseFloat(amount), category, date };
        await addExpense(expenseData);
        onExpenseAdded(); // Refresh the expense list
        setTitle("");
        setAmount("");
        setCategory("");
        setDate("");
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 w-full mb-2"
                    required
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border p-2 w-full mb-2"
                    required
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-2 w-full mb-2"
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border p-2 w-full mb-2"
                    required
                />
                <button
                    type="button"
                    onClick={handlePredictCategory}
                    className="bg-blue-500 text-white p-2 rounded w-full mb-2"
                    disabled={loading}
                >
                    {loading ? "Predicting..." : "Predict Category"}
                </button>
                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded w-full"
                >
                    Add Expense
                </button>
            </form>
        </div>
    );
};

export default AddExpenseForm;
