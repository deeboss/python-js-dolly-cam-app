from flask import Blueprint

app_template_views = Blueprint('app_template_views', __name__, template_folder='templates')

from . import index, events