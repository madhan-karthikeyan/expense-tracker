import sys
import pickle
import pandas as pd

# Load trained model
with open("backend/ml/random_forest_model.pkl", "rb") as f:
    model = pickle.load(f)

# Read input arguments (sent from Node.js)
subcategory = sys.argv[1].lower()
note = sys.argv[2].lower()
amount = float(sys.argv[3])
hour = int(sys.argv[4])
dayofweek = int(sys.argv[5])
payment_mode = sys.argv[6].lower()

# Convert input to DataFrame
data = pd.DataFrame([[subcategory, note, amount, hour, dayofweek, payment_mode]],
                    columns=["Subcategory", "Note", "Amount", "Hour", "DayOfWeek", "Payment Mode"])

# Make prediction
prediction = model.predict(data)[0]

# Print result (to send back to Node.js)
print(prediction)
