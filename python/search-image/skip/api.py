from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
import pandas as pd

# Khởi tạo Flask
app = Flask(__name__)

# Tải mô hình đã huấn luyện
model = load_model('./image_search_cnn.keras')

# Tải nhãn đã mã hóa (các sản phẩm)
label_encoder_classes = np.load('./label_classes.npy', allow_pickle=True)

# Đọc file CSV chứa productid và productname
df = pd.read_csv('./new_image_product.csv')  # Đường dẫn đến file CSV

# Hàm tiền xử lý hình ảnh đầu vào
def preprocess_image(img_path, target_size=(224, 224)):
    img = image.load_img(img_path, target_size=target_size)
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Chuẩn hóa về khoảng [0, 1]
    return img_array

# API tìm kiếm hình ảnh
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

    # Dự đoán nhãn sản phẩm
    prediction = model.predict(img_array)
    
    # Lấy 5 sản phẩm có xác suất cao nhất
    top_5_indices = np.argsort(prediction[0])[-5:][::-1]  # Sắp xếp và lấy chỉ số top 5
    
    # Lấy productid và productname tương ứng với top 5 sản phẩm
    top_5_products = []
    for index in top_5_indices:
        productname = label_encoder_classes[index]
        product_info = df[df['productname'] == productname].iloc[0]  # Lấy thông tin sản phẩm từ DataFrame
        productid = product_info['productid']
        top_5_products.append({
            'productid': productid,
            'productname': productname
        })
    
    # Trả về danh sách 5 sản phẩm dự đoán
    return jsonify({'top_5_products': top_5_products})

# Chạy server
if __name__ == '__main__':
    app.run(debug=True)
