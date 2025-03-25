import gradio as gr
import tensorflow as tf
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
import pickle

# Load the trained model
model = tf.keras.models.load_model("expense_model.h5")

# Load scaler for normalization
with open("scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

# Load category mapping
categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Other']

def predict_category(title, amount):
    # Prepare input features
    data = np.array([[amount, 15, 6, 2023]])  # Assume dummy date values
    data = scaler.transform(data)  # Normalize input
    
    # Predict category
    predictions = model.predict(data)
    predicted_category = categories[np.argmax(predictions)]
    
    return f"Predicted Category: {predicted_category}"

# Setup Gradio Interface
demo = gr.Interface(
    fn=predict_category,
    inputs=[
        gr.Textbox(label="Title"),
        gr.Number(label="Amount")
    ],
    outputs=gr.Textbox(label="Predicted Category"),
    title="Expense Category Predictor",
    description="Enter an expense title and amount to predict the category."
)

# Run the app
if __name__ == "__main__":
    demo.launch(share=True)