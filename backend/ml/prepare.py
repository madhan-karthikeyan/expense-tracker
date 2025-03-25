import pandas as pd
import numpy as np
import pickle
from sklearn.preprocessing import LabelEncoder, StandardScaler

# Load dataset
df = pd.read_csv("data.csv")

# Convert text columns to lowercase for consistency
df = df.map(lambda x: x.lower() if isinstance(x, str) else x)

# Encode categorical variables
label_encoders = {}
for col in ["Subcategory", "Note", "Payment Mode", "DayOfWeek"]:
    label_encoders[col] = LabelEncoder()
    df[col] = label_encoders[col].fit_transform(df[col])

# Save encoders
with open("label_encoders.pkl", "wb") as f:
    pickle.dump(label_encoders, f)

# Scale amount
scaler = StandardScaler()
df["Amount"] = scaler.fit_transform(df[["Amount"]])

# Save scaler
with open("scaler.pkl", "wb") as f:
    pickle.dump(scaler, f)

# Save processed dataset
df.to_csv("processed_data.csv", index=False)
print("Data preprocessing completed.")
