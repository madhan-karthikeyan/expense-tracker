const express = require("express");
const Expense = require("../models/Expense");
const predictCategory = require("../ml/predict"); // Import AI function
const router = express.Router();

// CREATE an Expense
router.post("/add", async (req, res) => {
  try {
      const { title, amount, subcategory, note, hour, dayofweek, payment_mode } = req.body;

      // Predict category using AI model
      const category = await predictCategory(subcategory, note, amount, hour, dayofweek, payment_mode);

      // Create new expense
      const newExpense = new Expense({
          title,
          amount,
          category, // AI-generated category
          subcategory,
          note,
          hour,
          dayofweek,
          payment_mode,
      });

      await newExpense.save();
      res.status(201).json(newExpense);
  } catch (error) {
      res.status(500).json({ message: "Error adding expense", error });
  }
});

// READ All Expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

// UPDATE an Expense (Fixed Route)
router.put("/:id", async (req, res) => {
  try {
    const { title, amount, category } = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { title, amount, category },
      { new: true, runValidators: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: "Failed to update expense" });
  }
});

// DELETE an Expense
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

module.exports = router;
