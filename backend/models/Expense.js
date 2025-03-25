const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true }, // AI predicted category
    subcategory: { type: String, required: false }, // New field
    note: { type: String, required: false }, // New field
    hour: { type: Number, required: false }, // New field
    dayofweek: { type: Number, required: false }, // New field
    payment_mode: { type: String, required: false }, // New field
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
