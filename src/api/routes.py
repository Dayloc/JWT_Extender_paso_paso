"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
#esta es la importacion para generar los token
from flask_jwt_extended import create_access_token, jwt_manager,jwt_required,get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash



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
@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return jsonify({"msg": "Email and password required"}), 400

    user = User.query.filter_by(email=email).first()

    # Verifica si user existe antes de usarlo
    if user is None:
        return jsonify({"msg": "Invalid email or password"}), 401
    
    # Verifica si las contraseñas hashadas coinciden

    if not check_password_hash(user.password, password):
        return jsonify({"msg": "Invalid email or password"}), 401

    token = create_access_token(identity=str(user.id))

    return jsonify({'token': token, 'user': user.serialize()}), 200
 


   

@api.route('/register', methods=['POST','GET'])
def register_user():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    
    
    # Verificamos falta email o password
    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    # Verificamos si el usuario ya existe
    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "User already exists"}), 409

    # Hasheamos la contraseña
    hashed_password = generate_password_hash(password)

    new_user = User(
        email=email,
        password=hashed_password,
        is_active=True
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User registered successfully"}), 201

@api.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = int(get_jwt_identity())
    user = db.session.get(User, user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify(user.serialize()), 200