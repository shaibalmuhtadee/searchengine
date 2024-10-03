from bottle import route, run, static_file, template, request, response
from collections import Counter
import json

top_20_keywords = Counter()


@route('/', method=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return template('views/index.html')
    elif request.method == 'POST':
        keywords = request.forms.get('keywords').strip()
        current_keywords = {}
        if keywords:
            current_keywords = get_word_count_map(keywords)
            top_20_keywords.update(current_keywords)
        sorted_dict = dict(top_20_keywords.most_common(20))
        return template('views/result.html', top_20_keywords=sorted_dict, current_keywords=current_keywords)


@route('/static/<filename>')
def server_static(filename):
    return static_file(filename, root='./static')


def get_word_count_map(text):
    words = text.split()
    return Counter(word.lower() for word in words)


run(host='localhost', port=8080, debug=True)
