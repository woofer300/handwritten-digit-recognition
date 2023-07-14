from flask import Flask, request, Response, jsonify
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
from PIL import ImageChops, ImageOps
import numpy as np
import base64
import io

app = Flask(__name__)
CORS(app)

@app.route('/api/receive_image', methods=['POST'])
def receive_image():
    #recieve and process image
    dataurl = request.data
    image_string = str(dataurl).split(',')[1]
    image_bytes = base64.b64decode(image_string)
    image = Image.open(io.BytesIO(image_bytes))



    #scale and processing
    image = image.resize((28, 28))
    bg = Image.new('RGB', (28, 28), 'white')
    bg.paste(image, image)
    image = bg
    image = ImageChops.invert(image)
    image = ImageOps.grayscale(image)


    image.save('request.png')


    img = np.array(image)
    img = img.reshape(-1, 28, 28, 1)
    img = img.astype('float32')
    img = img/255

    # load the model from the file
    image_model = tf.keras.models.load_model('image-model_v4.keras')
    image_model.summary()


    #make prediction

    output = image_model.predict(img)
    answer = output.argmax()

    print("Predicted answer: ", answer)
    print(output[0])

    #send response

    response = str({"prediction": answer, "confidence": output[0][answer]})
    response = response.replace("'", "\"")

    return Response(response=response, content_type='application/json')

if __name__ == '__main__':
    app.run( port=5000)
