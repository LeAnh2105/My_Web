from flask import Flask, render_template, request, jsonify
import os
from PIL import Image, ImageOps
import io
import base64

app = Flask(__name__, static_folder='static')


# Define a route to render the HTML page
@app.route('/')
def index():
    return render_template('index.html')

# Define a route to process the uploaded image
@app.route('/process_image', methods=['POST'])
def process_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    try:
        image = Image.open(file)
        grayscale_image = ImageOps.grayscale(image)

        # Save the grayscale image to a temporary file
        temp_image = io.BytesIO()
        grayscale_image.save(temp_image, format="JPEG")
        temp_image.seek(0)

        # Encode the grayscale image as base64
        encoded_image = base64.b64encode(temp_image.read()).decode('utf-8')

        return jsonify({'success': True, 'image': encoded_image})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)