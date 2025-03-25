import gradio as gr
import pickle
import numpy as np

# Load trained model
with open("random_forest_model.pkl", "rb") as f:
    model = pickle.load(f)

# Load encoders and scaler
with open("label_encoders.pkl", "rb") as f:
    label_encoders = pickle.load(f)

with open("scaler.pkl", "rb") as f:
    scaler = pickle.load(f)

def predict_category(subcategory, note, amount, hour, dayofweek, payment_mode):
    try:
        # Convert inputs to lowercase
        subcategory, note, payment_mode, dayofweek = (
            subcategory.lower(), note.lower(), payment_mode.lower(), dayofweek.lower()
        )

        # Handle unseen values with fallback (-1)
        subcategory_encoded = label_encoders["Subcategory"].transform([subcategory])[0] if subcategory in label_encoders["Subcategory"].classes_ else -1
        note_encoded = label_encoders["Note"].transform([note])[0] if note in label_encoders["Note"].classes_ else -1
        payment_encoded = label_encoders["Payment Mode"].transform([payment_mode])[0] if payment_mode in label_encoders["Payment Mode"].classes_ else -1
        dayofweek_encoded = label_encoders["DayOfWeek"].transform([dayofweek])[0] if dayofweek in label_encoders["DayOfWeek"].classes_ else -1

        amount_scaled = scaler.transform([[amount]])[0][0]

        # Prepare input
        input_data = np.array([[subcategory_encoded, note_encoded, amount_scaled, hour, dayofweek_encoded, payment_encoded]])
        predicted_category = model.predict(input_data)[0]

        return f"Predicted Category: {predicted_category}"
    except Exception as e:
        return str(e)

demo = gr.Interface(
    fn=predict_category,
    inputs=[
        gr.Textbox(label="Subcategory"),
        gr.Textbox(label="Note"),
        gr.Number(label="Amount"),
        gr.Number(label="Hour"),
        gr.Textbox(label="Day of Week"),  # Accepts names like "Monday"
        gr.Textbox(label="Payment Mode")
    ],
    outputs=gr.Textbox(label="Predicted Category"),
    title="Expense Category Predictor",
    description="Enter details to predict the category of your expense."
)

if __name__ == "__main__":
    demo.launch(share=True)
