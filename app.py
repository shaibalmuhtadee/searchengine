from bottle import route, run, static_file, template, request, response
from collections import Counter
import json

top_20_keywords = Counter()


@route('/')
def index():
    sorted_dict = dict(top_20_keywords.most_common(20))
    return template('views/index.html', top_20_keywords=sorted_dict)


@route('/static/<filename>')
def server_static(filename):
    return static_file(filename, root='./static')


@route('/search', method='GET')
def search():
    global top_20_keywords
    keywords = request.query.keywords.strip()
    if not keywords:
        response.content_type = 'application/json'
        return json.dumps(dict(top_20_keywords.most_common(20)))

    word_count_map = get_word_count_map(keywords)
    top_20_keywords.update(word_count_map)

    response.content_type = 'application/json'
    return json.dumps(dict(top_20_keywords.most_common(20)))


def get_word_count_map(text):
    words = text.split()
    return Counter(word.lower() for word in words)


run(host='localhost', port=8080, debug=True)
