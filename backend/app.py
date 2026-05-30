from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import os

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

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
    print("Audio size received:", len(audio_data), "bytes")
    print("API KEY:", DEEPGRAM_API_KEY[:15] if DEEPGRAM_API_KEY else "NOT FOUND")

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
    print("Deepgram full response:", result)

    try:
        transcript = result['results']['channels'][0]['alternatives'][0]['transcript']
        print("Transcript:", transcript)
        if transcript:
            return jsonify({'status': 'ok', 'transcript': transcript})
        else:
            return jsonify({'error': 'Empty transcript returned'}), 400
    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(result)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')