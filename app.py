from flask import Flask, render_template      
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, This is a message coming from the Pi! This message specifically is coming from my deeboss/flask2html branch'

@app.route('/remote')
def remote():
    return render_template("index.html")
    
if __name__ == "__main__":
    app.run(debug=True)