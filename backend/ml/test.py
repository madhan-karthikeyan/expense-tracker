import pickle
import numpy as np
import pandas as pd

# Load trained model
with open("random_forest_model.pkl", "rb") as f:
    model = pickle.load(f)

# Load label encoders and scaler
with open("label_encoders.pkl", "rb") as f:
    label_encoders = pickle.load(f)

with open("scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

# Function to preprocess input and predict
def predict_category(subcategory, note, amount, hour, dayofweek, payment_mode):
    # Encode categorical inputs
    subcategory_encoded = label_encoders["Subcategory"].transform([subcategory])[0]
    note_encoded = label_encoders["Note"].transform([note])[0]
    payment_encoded = label_encoders["Payment Mode"].transform([payment_mode])[0]

    # Scale numerical input
    amount_scaled = scaler.transform([[amount]])[0][0]

    # Prepare input array
    input_data = np.array([[subcategory_encoded, note_encoded, amount_scaled, hour, dayofweek, payment_encoded]])

    # Predict
    predicted_category = model.predict(input_data)[0]
    return f"Predicted Category: {predicted_category}"

# Example usage
print(predict_category("Groceries", "Walmart Purchase", 150.0, 14, 3, "Credit Card"))
print(predict_category("Transport", "Uber Ride", 25.0, 19, 5, "Credit Card"))
print(predict_category("Food", "McDonald's", 10.0, 12, 1, "Cash"))