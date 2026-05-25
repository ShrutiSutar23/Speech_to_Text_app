from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Speech to Text API is running!'})

@app.route('/transcribe', methods=['POST'])
def transcribe():
    file = request.files.get('file')
    
    if not file:
        return jsonify({'error': 'No audio file received'}), 400
    
    temp_path = f"/tmp/{file.filename}"
    file.save(temp_path)
    
    return jsonify({
        'status': 'ok',
        'message': 'File received successfully',
        'filename': file.filename
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)