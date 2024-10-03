from bottle import route, run, static_file, template, request, response
import json

top_20_keywords = {}


@route('/')
def index():
    sorted_dict = {}
    if top_20_keywords:
        sorted_dict = {k: v for k, v in sorted(top_20_keywords.items(),
                                               key=lambda x: x[1],
                                               reverse=True)}
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
        return json.dumps(top_20_keywords)

    word_count_map = get_word_count_map(keywords)

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


def get_word_count_map(text):
    words = text.split()
    word_count_map = {}
    for word in words:
        word = word.lower()
        if word in word_count_map:
            word_count_map[word] += 1
        else:
            word_count_map[word] = 1
    return word_count_map


run(host='localhost', port=8080, debug=True)
