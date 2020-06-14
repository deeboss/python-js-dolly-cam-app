from flask import session, redirect, url_for, render_template, request
from . import main
# from .forms import LoginForm


@main.route('/', methods=['GET', 'POST'])
def index():
    """Login form to enter a room."""
    # form = LoginForm()
    # if form.validate_on_submit():
    #     session['name'] = form.name.data
    #     session['room'] = form.room.data
    #     return redirect(url_for('.chat'))
    # elif request.method == 'GET':
    #     form.name.data = session.get('name', '')
    #     form.room.data = session.get('room', '')
    return render_template('index.html')