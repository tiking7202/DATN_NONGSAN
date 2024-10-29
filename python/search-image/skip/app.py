from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import os
import pandas as pd

# Khởi tạo Flask
app = Flask(__name__)

# Tải mô hình đã huấn luyện
model = load_model('image_search_cnn.h5')

# Tạo mô hình để trích xuất đặc trưng
feature_model = Model(inputs=model.input, outputs=model.layers[-2].output)

# Tải đặc trưng và thông tin sản phẩm
image_features = np.load('image_features.npy')
df = pd.read_csv('product_info.csv')

# Hàm tiền xử lý hình ảnh
def preprocess_image(img_path, target_size=(224, 224)):
    img = image.load_img(img_path, target_size=target_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Chuẩn hóa về [0, 1]
    return img_array

# Hàm tính độ tương đồng Cosine
def get_top_similar_images(query_image_features, image_features, top_k=5):
    similarities = cosine_similarity(query_image_features, image_features)
    top_k_indices = np.argsort(similarities[0])[-top_k:][::-1]
    return top_k_indices

# API dự đoán
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    
    # Lưu file tạm thời
    img_path = os.path.join('temp', file.filename)
    file.save(img_path)

    # Tiền xử lý hình ảnh
    img_array = preprocess_image(img_path)

    # Trích xuất đặc trưng của ảnh đầu vào
    query_image_features = feature_model.predict(img_array)

    # Tìm 5 ảnh có độ tương đồng cao nhất
    top_k_indices = get_top_similar_images(query_image_features, image_features)

    # Lấy thông tin sản phẩm tương ứng
    top_5_products = []
    for index in top_k_indices:
        product_info = df.iloc[index]
        top_5_products.append({
            'productid': product_info['productid'],
            'productname': product_info['productname']
        })

    return jsonify({'top_5_products': top_5_products})

# Chạy server Flask
if __name__ == '__main__':
    if not os.path.exists('temp'):
        os.makedirs('temp')
    app.run(debug=True)
