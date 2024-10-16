
import numpy as np
import json

# Load the feature database from .npy file
feature_database = np.load('./feature_database.npy', allow_pickle=True).item()

# Convert numpy arrays to lists for JSON serialization
for key, value in feature_database.items():
    value['features'] = value['features'].tolist()

# Save the feature database to a JSON file
with open('feature_database.json', 'w') as json_file:
    json.dump(feature_database, json_file)