#!/usr/bin/python3
"""
Flask App that integrates with static HTML Template
"""
from views import app_views, app_template_views
from flask import Flask, jsonify, json, render_template, request
# from models import filename_of_models
import os

# Global Flask Application Variable: app
app = Flask(__name__)

# flask server environmental setup
host = os.getenv('API_HOST', '0.0.0.0')
port = os.getenv('API_PORT', 5000)

# Cross-Origin Resource Sharing
# cors = CORS(app, resources={r"/api/v1/*": {"origins": "*"}})

# app_views BluePrint defined in api.v1.views
app.register_blueprint(app_views)
app.register_blueprint(app_template_views)


# begin flask page rendering
if __name__ == "__main__":
    # start Flask app
    app.run(host=host, port=port)