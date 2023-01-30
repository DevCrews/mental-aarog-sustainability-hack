from flask import Flask
from flask import request
from utils.predictor import predict
import tweepy
from flask_cors import CORS, cross_origin
from flask_ngrok import run_with_ngrok


consumer_key = "E6hLFj9Ye2I6johRs68Q3mytU"
consumer_secret = "bhW5C0CV3rqvsKhSI9odQxXgseNvqL8TCAvE6jAxEbkLcJMlVJ"
access_key = "1407851372167393280-l7aGvlPyszXDu3MXCxLTf3NX0yIwOd"
access_secret = "FtjbSSjSVfrTCnh83VUcaYKh7uhax3cwCfPpw2cBJhxFF"


def get_tweets(username):
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_key, access_secret)
    api = tweepy.API(auth)
    tweets = api.user_timeline(screen_name=username)
    tmp = []
    tw = [tweet.text for tweet in tweets]
    for j in tw:
        tmp.append(j)
    return tmp


app = Flask(__name__)
CORS(app)
print(run_with_ngrok(app))


@app.route('/')
def display():
    return 'Server is Running properly...'


@app.route('/twitter', methods=['POST'])
def twitter():
    if request.method == 'POST':
        username = request.get_json()
        username = username['username']
        tweets = get_tweets(username)
        result = []
        tip = ''
        for j in tweets:
            output, tips = predict(j)
            result.append(output)
            if output == 'Depressive':
                tip = tips
        d = 0
        p = 0
        for i in result:
            if i == 'Depressive':
                d += 1
            else:
                p += 1
        if d > p:
            result = 'Depression'
        else:
            result = 'Positive'
        if result == 'Positive':
            tip = 'You do not have depression stay the same and live a happy life'
        return {
            'result': result,
            'tip': tip
        }


@app.route('/analyze', methods=['POST'])
def analyze():
    if request.method == 'POST':
        text = request.get_json()
        text = text['text']

        output, tips = predict(text)
        resdic = {
            'output': output,
            'tips': tips
        }
        return resdic


if __name__ == '__main__':
    app.run()
