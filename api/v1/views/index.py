from flask import session, redirect, url_for, render_template, request
from . import app_template_views, app_views


@app_template_views.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app_template_views.route('/app', methods=['GET', 'POST'])
def app():
    return render_template('app.html')

@app_views.route('/restart', methods=['GET'])
def restart():
    os.system("sudo reboot")
    return jsonify(200)

@app_views.route('/shutdownDevice', methods=['GET'])
def shutdownDevice():
    os.system("sudo poweroff")
    return jsonify(200)
    
def shutdown_server():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()

    
@app_views.route('/shutdown', methods=['GET'])
def shutdown():
    shutdown_server()
    return jsonify("OK")