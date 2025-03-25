const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const expenseRoutes = require("./routes/ExpenseRoutes");
const Expense = require("./models/Expense");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB with Error Handling
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(" Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

const db = mongoose.connection;

// Middleware: Use Routes
app.use("/api/expenses", expenseRoutes);

//  Test Route
app.get("/api/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find(); // ✅ 'await' is inside an async function
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//  Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
