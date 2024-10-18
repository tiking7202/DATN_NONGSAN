from flask import Flask, request, jsonify
import numpy as np
from tensorflow.keras.applications import ResNet50
from PIL import Image
from sklearn.metrics.pairwise import cosine_similarity
from tensorflow.keras.applications.resnet50 import preprocess_input
import os
import sys
import logging

# Đặt mã hóa đầu ra thành UTF-8
sys.stdout.reconfigure(encoding='utf-8')

# Cấu hình logging
logging.basicConfig(level=logging.DEBUG)

# Khởi tạo Flask app
app = Flask(__name__)

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

# Load feature database từ file .npy
base_dir = os.path.dirname(os.path.abspath(__file__))
feature_database_path = os.path.join(base_dir, '../feature_database.npy')
feature_database = np.load(feature_database_path, allow_pickle=True).item()

# API để tìm kiếm hình ảnh
@app.route('/search-image', methods=['POST'])
def search_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    # Lưu ảnh tạm thời
    image_file = request.files['image']
    image_path = os.path.join(base_dir, "temp_image.jpg")
    image_file.save(image_path)

    # Tìm kiếm sản phẩm tương tự
    try:
        query_features = extract_features(image_path)
        similarities = []
        for product_id, data in feature_database.items():
            product_features = data['features']
            similarity = cosine_similarity(query_features, product_features)
            similarities.append((product_id, similarity[0][0]))

        # Sắp xếp kết quả theo độ tương tự và chỉ lấy productid
        similarities = sorted(similarities, key=lambda x: x[1], reverse=True)
        top_product_ids = [item[0] for item in similarities[:8]]  # Lấy top 5 sản phẩm tương tự

        return jsonify({'product_ids': top_product_ids})
    except Exception as e:
        logging.error(f"Error during image search: {e}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=12000)