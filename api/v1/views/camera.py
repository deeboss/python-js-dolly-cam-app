"""
Flask route that returns json status response
"""
from views import app_views
from flask import Flask, jsonify, json, render_template, request
# from models import filename_of_model

@app_views.route('/test', methods=['GET'])
def test():
    """
    function for status route that returns the status
    """
    data = {"status": "OK"}
    return jsonify(data)
