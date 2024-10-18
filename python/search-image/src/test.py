import os
import numpy as np
from PIL import Image
from sklearn.metrics.pairwise import cosine_similarity
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.applications.resnet50 import preprocess_input

# Load ResNet50 pre-trained model
model = ResNet50(weights='imagenet', include_top=False, pooling='avg')

# Function to load image and preprocess it for ResNet50
def load_and_preprocess_image(img_path):
    img = Image.open(img_path)
    img = img.resize((224, 224))  # ResNet50 expects images of size 224x224
    img_array = np.array(img)
    if img_array.shape[-1] == 4:  # Check if image has an alpha channel
        img_array = img_array[..., :3]  # Discard the alpha channel
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    return img_array

# Function to extract features from an image using ResNet50
def extract_features(img_path):
    img_array = load_and_preprocess_image(img_path)
    features = model.predict(img_array)
    return features

# Load feature database from .npy file
feature_database = np.load('feature_database.npy', allow_pickle=True).item()

# Function to search for the most similar products based on cosine similarity
def search_image(img_path, feature_database, top_n=5):
    query_features = extract_features(img_path)

    similarities = []
    for product_id, data in feature_database.items():
        product_features = data['features']
        similarity = cosine_similarity(query_features, product_features)
        similarities.append((product_id, data['product_name'], similarity[0][0]))

    # Sort by similarity
    similarities = sorted(similarities, key=lambda x: x[2], reverse=True)
    return similarities[:top_n]  # Return top N most similar products

# Example search
uploaded_image_path = '../test/OIP.jpg'  # Image uploaded by user
similar_products = search_image(uploaded_image_path, feature_database)

print("Top 5 similar products:")
for product in similar_products:
    print(f"Product ID: {product[0]}, Product Name: {product[1]}, Similarity: {product[2]:.4f}")
