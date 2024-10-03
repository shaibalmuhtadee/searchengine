from bottle import route, run, static_file, template, request, response
import json

top_20_keywords = {}


@route('/')
def index():
    return template('views/index.html', top_20_keywords=top_20_keywords)


@route('/static/<filename>')
def server_static(filename):
    return static_file(filename, root='./static')


@route('/search', method='POST')
def search():
    global top_20_keywords
    data = request.json
    word_count_map = data.get('word_count_map', {})

    for word, count in word_count_map.items():
        if word in top_20_keywords:
            top_20_keywords[word] += count
        else:
            top_20_keywords[word] = count

    # Keep only the top 20 keywords
    top_20_keywords = dict(
        sorted(top_20_keywords.items(), key=lambda item: item[1], reverse=True)[:20])

    response.content_type = 'application/json'
    return json.dumps(top_20_keywords)


run(host='localhost', port=8080, debug=True)
