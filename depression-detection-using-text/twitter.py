import tweepy
from utils.predictor import predict

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


def analyze():
        username = {'username' : 'RahulGandhi'}
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
            'result' : result,
            'tip' : tip
        }

print(analyze())