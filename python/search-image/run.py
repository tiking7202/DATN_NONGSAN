import requests

# Đường dẫn API
url = 'http://127.0.0.1:5000/predict'

# Đường dẫn đến ảnh cần tìm kiếm
file_path = './test/OIF.jpg'

# Gửi request
with open(file_path, 'rb') as f:
    files = {'file': f}
    response = requests.post(url, files=files)

# In kết quả
print(response.json())
