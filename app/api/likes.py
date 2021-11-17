from flask import Blueprint, request
from flask_login import login_required
from app.models import db, User, Like
from datetime import datetime as dt


like_routes = Blueprint("likes", __name__)


# Get Likes For Tweet
@like_routes.route('/<int:tweet_id>', methods =['GET'])
@login_required
def get_the_likes(tweet_id):
    likes = db.session.query(Like).filter(Like.tweet_id==tweet_id).count()
    return {"likes": likes}


# POST Tweet
@like_routes.route('/add', methods =['POST'])
@login_required
def post_a_like():
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

    return {"tweet": tweet_dict}


# DELETE Tweet
@like_routes.route('/delete/<int:tweet_id>', methods =['DELETE'])
@login_required
def delete_a_like(tweet_id):
    db.session.query(Tweet).filter(Tweet.id==tweet_id).delete()
    db.session.commit()
    return {"tweet_id": tweet_id}
