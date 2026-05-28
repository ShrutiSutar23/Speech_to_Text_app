from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY")

@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Speech to Text API is running!'})

@app.route('/transcribe', methods=['POST'])
def transcribe():
    file = request.files.get('file')

    if not file:
        return jsonify({'error': 'No audio file received'}), 400

    audio_data = file.read()

    headers = {
        'Authorization': f'Token {DEEPGRAM_API_KEY}',
        'Content-Type': 'audio/webm'
    }

    response = requests.post(
        'https://api.deepgram.com/v1/listen?punctuate=true',
        headers=headers,
        data=audio_data
    )

    result = response.json()

    transcript = result['results']['channels'][0]['alternatives'][0]['transcript']

    return jsonify({
        'status': 'ok',
        'transcript': transcript
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)