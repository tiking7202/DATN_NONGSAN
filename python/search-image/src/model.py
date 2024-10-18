import os
import numpy as np
import pandas as pd
from PIL import Image
from tensorflow.keras.applications import ResNet50
from tensorflow.keras.applications.resnet50 import preprocess_input
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.preprocessing import LabelEncoder

# Load ResNet50 pre-trained model
model = ResNet50(weights='imagenet', include_top=False, pooling='avg')

# Load CSV
data = pd.read_csv('../new_image_product.csv')

# Label Encoding for products (in case needed for further fine-tuning)
le = LabelEncoder()
data['label'] = le.fit_transform(data['productid'])

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

# Apply data augmentation for feature robustness
datagen = ImageDataGenerator(
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest'
)

# Process all product images and extract features
def build_feature_database(data):
    feature_database = {}
    for index, row in data.iterrows():
        img_path = os.path.join('../', row['imagepath'])
        product_id = row['productid']
        product_name = row['productname']

        # Augment images and extract multiple features
        img_array = load_and_preprocess_image(img_path)
        img_gen = datagen.flow(img_array)
        augmented_features = []

        # Extract features from multiple augmented versions
        for _ in range(5):  # Create 5 augmented versions
            aug_img = next(img_gen)
            aug_features = model.predict(aug_img)
            augmented_features.append(aug_features)
        
        # Average the augmented features
        avg_features = np.mean(augmented_features, axis=0)
        feature_database[product_id] = {
            'product_name': product_name,
            'features': avg_features
        }
    return feature_database

# Initialize the model with dummy data
dummy_data = np.zeros((1, 224, 224, 3))
_ = model.predict(dummy_data)

# Build and save the feature database
feature_database = build_feature_database(data)
np.save('feature_database.npy', feature_database)
