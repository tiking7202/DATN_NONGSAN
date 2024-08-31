# app.py
from flask import Flask, request, jsonify

app = Flask(__name__)

# Route for the home page
@app.route('/')
def home():
    return "Welcome to the Flask API!"

# Route for a GET request
@app.route('/api/data', methods=['GET'])
def get_data():
    data = {"message": "This is your data"}
    return jsonify(data)

# Route for a POST request
@app.route('/api/data', methods=['POST'])
def post_data():
    input_data = request.json
    response = {"received": input_data}
    return jsonify(response), 201

# Route with URL parameters
@app.route('/api/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    return jsonify({"user_id": user_id})

# Custom error handling
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not Found"}), 404

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
