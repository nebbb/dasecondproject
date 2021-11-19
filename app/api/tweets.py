from flask import Blueprint, request
from flask_login import login_required
from app.models import db, User, Tweet, Like, Comment
from datetime import date, datetime as dt

tweet_routes = Blueprint("tweets", __name__)

# Get Single Tweet
@tweet_routes.route('/<int:tweet_id>', methods =['GET'])
@login_required
def get_a_tweet(tweet_id):
    tweet = Tweet.query.get(tweet_id)
    tweet_dict = tweet.to_dict()
    user = User.query.get(tweet_dict["user_id"])
    tweet_dict["user"] = user.to_dict()

    comment_array = db.session.query(Comment).filter(Comment.tweet_id==tweet_dict["id"]).all()
    comment_dict = []

    for comment in comment_array:
        comm_dict = comment.to_dict()
        user = User.query.get(comm_dict["user_id"])
        comm_dict["user"] = user.to_dict()
        comment_dict.append(comm_dict)

    like_array = db.session.query(Like).filter(Like.tweet_id==tweet_dict["id"]).all()
    tweet_dict["comment_count"] = len(comment_dict)
    tweet_dict["like_count"] = len(like_array)
    tweet_dict["like_array"] = [like.to_dict() for like in like_array]
    tweet_dict["comment_array"] = comment_dict

    return {"tweet": tweet_dict}


# Get Home Tweets
@tweet_routes.route('/home', methods =['GET'])
@login_required
def get_home_tweets():
    tweets = Tweet.query.all()

    loop = []
    for tweet in tweets:
        tweet_dict = tweet.to_dict()
        user = User.query.get(tweet_dict["user_id"])
        tweet_dict["user"] = user.to_dict()

        comment_count = db.session.query(Comment).filter(Comment.tweet_id==tweet_dict["id"]).count()
        like_array = db.session.query(Like).filter(Like.tweet_id==tweet_dict["id"]).all()

        tweet_dict["comment_count"] = comment_count
        tweet_dict["like_count"] = len(like_array)
        tweet_dict["like_array"] = [like.to_dict() for like in like_array]

        loop.append(tweet_dict)

    return {"tweets": loop}


# POST Tweet
@tweet_routes.route('/add', methods =['POST'])
@login_required
def post_a_tweet():
    data = request.json
    tweet = Tweet(
        user_id = data["user_id"],
        tweet = data["tweet"],
        image = data["image"],
        sent_date = dt.now()
    )
    db.session.add(tweet)
    db.session.commit()

    tweet_dict = tweet.to_dict()
    user = User.query.get(tweet_dict["user_id"])
    tweet_dict["user"] = user.to_dict()

    comment_count = db.session.query(Comment).filter(Comment.tweet_id==tweet_dict["id"]).count()
    like_array = db.session.query(Like).filter(Like.tweet_id==tweet_dict["id"]).all()

    tweet_dict["comment_count"] = comment_count
    tweet_dict["like_count"] = len(like_array)
    tweet_dict["like_array"] = [like.to_dict() for like in like_array]

    return {"tweet": tweet_dict}


# Update Tweet
@tweet_routes.route('/<int:tweet_id>', methods =['PUT'])
@login_required
def update_a_tweet(tweet_id):
    tweet = Tweet.query.get(tweet_id)
    data = request.json
    old_data = tweet.to_dict()

    # If an tweet is not sent, use the old one
    tweet_tweet = old_data["tweet"] if "tweet" not in data else data["tweet"]
    tweet.tweet = tweet_tweet
    # If an image is not sent, use the old one
    tweet_image = old_data["image"] if "image" not in data else data["image"]
    tweet.image = tweet_image
    db.session.commit()

    user = User.query.get(old_data["user_id"])
    tweet_dict = tweet.to_dict()
    tweet_dict["user"] = user.to_dict()

    comment_count = db.session.query(Comment).filter(Comment.tweet_id==tweet_dict["id"]).count()
    like_array = db.session.query(Like).filter(Like.tweet_id==tweet_dict["id"]).all()

    tweet_dict["comment_count"] = comment_count
    tweet_dict["like_count"] = len(like_array)
    tweet_dict["like_array"] = [like.to_dict() for like in like_array]

    return {"tweet": tweet_dict}


# DELETE Tweet
@tweet_routes.route('/delete/<int:tweet_id>', methods =['DELETE'])
@login_required
def delete_a_tweet(tweet_id):
    db.session.query(Tweet).filter(Tweet.id==tweet_id).delete()
    db.session.commit()
    return {"tweet_id": tweet_id}
