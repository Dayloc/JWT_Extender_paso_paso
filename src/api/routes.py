"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
#esta es la importacion para generar los token
from flask_jwt_extended import create_access_token, jwt_manager,jwt_required



api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#1 Me creo una ruta para poder crear el token
@api.route('/token', methods=['POST','GET'])
def create_token():
    #sacamos de la request los datos que vamos a recibir:
    
    email= request.json.get('email',None)
    password = request.json.get('password',None)
    
    #sacamos el usuario del modelo de User
    
    user = User.query.filter_by(email=email , password = password).first()
    user = user.serialize()
    token = create_access_token(identity='user["id"]')
    
    return jsonify({'token': token, 'user':user}),200       