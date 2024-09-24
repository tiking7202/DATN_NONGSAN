from flask import Flask, request, jsonify
import pickle
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import numpy as np

app = Flask(__name__)

# Tải mô hình và các đối tượng đã lưu
with open('./svd_model.pkl', 'rb') as f:
    svd_model = pickle.load(f)

with open('./tfidf_vectorizer.pkl', 'rb') as f:
    tfidf = pickle.load(f)

with open('./cosine_similarity.pkl', 'rb') as f:
    cosine_sim = pickle.load(f)

# Đọc dữ liệu product_content
product_content_df = pd.read_csv('./data/product_content.csv')
product_content_df['content'] = (
    product_content_df['categoryname'].astype(str) + ' ' +
    product_content_df['farmname'].astype(str) + ' ' +
    product_content_df['farmprovince'].astype(str)
)
# Kiểm tra nếu hàm preprocess_text tồn tại
try:
    product_content_df['content'] = product_content_df['content'].apply(preprocess_text)
except NameError:
    print("Hàm preprocess_text không được định nghĩa!")

# Tạo Series mapping productid tới chỉ số trong DataFrame
indices = pd.Series(product_content_df.index, index=product_content_df['productid']).drop_duplicates()

# Đọc dữ liệu user_item_interactions
user_item_df = pd.read_csv('./data/user_item_interactions.csv')

@app.route('/recommend', methods=['GET'])
def recommend():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'error': 'Missing user_id parameter'}), 400
    
    try:
        if user_id in user_item_df['userid'].unique():
            # Collaborative Filtering: Dự đoán điểm cho các sản phẩm chưa tương tác
            interacted_products = user_item_df[user_item_df['userid'] == user_id]['productid'].unique()
            all_products = set(product_content_df['productid'])
            recommendable_products = list(all_products - set(interacted_products))
            
            # Dự đoán điểm từ mô hình SVD
            collab_predictions = [svd_model.predict(user_id, pid).est for pid in recommendable_products]
            collab_scores = pd.Series(collab_predictions, index=recommendable_products)
            
            # Content-Based Filtering: Tính similarity trung bình với các sản phẩm đã tương tác
            if len(interacted_products) > 0:
                sim_matrix = cosine_sim[:, [indices[pid] for pid in interacted_products if pid in indices]]
                if sim_matrix.shape[1] > 0:
                    content_scores = sim_matrix.mean(axis=1)
                else:
                    content_scores = pd.Series(0, index=product_content_df['productid'])
            else:
                content_scores = pd.Series(0, index=product_content_df['productid'])
            
            # Chuẩn hóa điểm
            scaler = MinMaxScaler()
            collab_scores_scaled = pd.Series(scaler.fit_transform(collab_scores.values.reshape(-1, 1)).flatten(), index=collab_scores.index)
            content_scores_scaled = pd.Series(scaler.fit_transform(content_scores.reshape(-1, 1)).flatten(), index=product_content_df['productid'])
            
            # Tạo hybrid score
            hybrid_scores = 0.6 * collab_scores_scaled + 0.4 * content_scores_scaled
            
            # Lấy top N sản phẩm
            top_n = 20
            top_products = hybrid_scores.sort_values(ascending=False).head(top_n).index.tolist()
            
            # Lấy thông tin sản phẩm từ product_content_df
            recommendations = product_content_df[product_content_df['productid'].isin(top_products)].to_dict(orient='records')
            
        else:
            # Người dùng mới: Gợi ý sản phẩm phổ biến
            top_n_popular = 20
            popular_products = product_content_df['productid'].head(top_n_popular).tolist()
            recommendations = product_content_df[product_content_df['productid'].isin(popular_products)].to_dict(orient='records')
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
