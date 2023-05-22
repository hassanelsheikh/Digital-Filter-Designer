from flask import Flask , request, render_template,jsonify
import json
from flask_cors import CORS, cross_origin
import numpy as np
from logic import Logic

logic = Logic()

output= [0]
allpasszeros, allpasspoles= [],[]
filterangles, finalAngles, allPassAngles= [0],[0],[0]
totalzeros, totalpoles= [0],[0]


app = Flask(__name__) 

@app.route('/', methods= ['GET','POST'])
def home():
    return render_template('index.html')


@app.route('/getFilter', methods=['POST'])
@cross_origin()
def getFrequencyResponce():
    global filterangles, allPassAngles, totalzeros, totalpoles
    if request.method == 'POST':
        zerosAndPoles = json.loads(request.data)
        logic.zeros = logic.parseToComplex(zerosAndPoles['zeros'])
        logic.poles = logic.parseToComplex(zerosAndPoles['poles'])
        logic.gain = zerosAndPoles['gain']
        w, filterangles, magnitude = logic.frequencyResponse()
        filterangles= np.add(allPassAngles, filterangles)
    
        response_data = {
                'w': w.tolist(),
                'angels': filterangles.tolist(),
                'magnitude': magnitude.tolist()
            }
        zero,pole,k= logic.getfrompair()
        totalzeros= zero+allpasszeros
        totalpoles= pole+allpasspoles
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True)