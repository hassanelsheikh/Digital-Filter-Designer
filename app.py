from flask import Flask , request, render_template,jsonify
import json
from flask_cors import CORS, cross_origin
import numpy as np

app = Flask(__name__) 

@app.route('/', methods= ['GET','POST'])
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)