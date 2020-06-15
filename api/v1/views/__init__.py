from flask import Blueprint, Flask, jsonify, json, render_template, request

app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')
app_template_views = Blueprint('app_template_views', __name__, template_folder='../templates', static_folder='../static/assets')

from . import index, events