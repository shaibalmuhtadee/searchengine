from bottle import route, run, static_file, template

@route('/')
def index():
    return template('views/index.html')

@route('/static/<filename>')
def server_static(filename):
    return static_file(filename, root='./static')

run(host='localhost', port=8080, debug=True)