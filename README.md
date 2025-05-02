
# Smart Expense Tracker (MERN + Machine Learning)

A full-stack expense tracking web application built with the **MERN** stack, featuring **CRUD operations**, **user authentication**, and a machine learning model that **automatically classifies expenses into categories** using a **Random Forest Classifier** (88% accuracy).

---

## Features

- Add, edit, and delete expenses
- View categorized expense analytics
- User authentication (login/signup)
- ML-powered category prediction for each expense
- Trained Random Forest model with 88% accuracy
- Real-time REST API communication between ML model and frontend

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- Python (Random Forest Model)

---

## Project Structure

```
smart-expense-tracker/
├── backend/         # Node.js + Express API
│   ├── server.js
│   └── routes/, models/, controllers/, etc.
│   └── ml-model/        # Python folder for the ML model (if separate)
│   └── model.pkl
├── frontend/        # React frontend
    ├── src/
    └── package.json
```

---

## Installation & Running Locally

### Clone the repository

```bash
git clone https://github.com/madhan-karthikeyan/expense-tracker.git
cd expense-tracker
```

### Start the Backend

```bash
cd backend
npm install
node server.js
```

Or with nodemon:

```bash
npm run dev
```

### Start the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

### (Optional) Start ML Model API (if separate)

```bash
cd ml-model
pip install -r requirements.txt
python app.py
```

---

## Machine Learning Model

- Model: **Random Forest Classifier**
- Accuracy: **88%**
- Features: Expense title, amount, date, etc.
- Output: Predicted category (e.g., Food, Transport, Bills)
- API Endpoint: `/predict` (receives transaction data and returns category)

---

---

## License

This project is open source under the [MIT License](LICENSE).

---
