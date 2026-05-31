from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import os

load_dotenv(override=True)

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://127.0.0.1:3000"])

DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

def supabase_headers():
    return {
        'apikey': SUPABASE_KEY,
        'Authorization': f'Bearer {SUPABASE_KEY}',
        'Content-Type': 'application/json'
    }

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
    print("Deepgram response:", result)

    try:
        transcript = result['results']['channels'][0]['alternatives'][0]['transcript']
        if transcript:
            save_response = requests.post(
                f'{SUPABASE_URL}/rest/v1/transcripts',
                headers=supabase_headers(),
                json={'text': transcript, 'filename': file.filename}
            )
            print("Supabase save:", save_response.status_code)
        return jsonify({'status': 'ok', 'transcript': transcript})
    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(result)}), 500

@app.route('/transcripts', methods=['GET'])
def get_transcripts():
    try:
        response = requests.get(
            f'{SUPABASE_URL}/rest/v1/transcripts?order=created_at.desc',
            headers=supabase_headers()
        )
        return jsonify({'transcripts': response.json()})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/transcripts/<id>', methods=['DELETE'])
def delete_transcript(id):
    try:
        requests.delete(
            f'{SUPABASE_URL}/rest/v1/transcripts?id=eq.{id}',
            headers=supabase_headers()
        )
        return jsonify({'status': 'ok', 'message': 'Deleted successfully'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')