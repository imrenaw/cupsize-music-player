import os
from flask import Flask, jsonify, send_from_directory

app = Flask(__name__)

# Папка, где хранятся MP3-файлы
MUSIC_FOLDER = "music"

@app.route('/tracks', methods=['GET'])
def get_tracks():
    """Возвращает список всех MP3-файлов в папке"""
    try:
        files = [f for f in os.listdir(MUSIC_FOLDER) if f.endswith('.mp3')]
        return jsonify(files)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/music/<filename>', methods=['GET'])
def serve_track(filename):
    """Отправляет запрашиваемый MP3-файл"""
    return send_from_directory(MUSIC_FOLDER, filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
