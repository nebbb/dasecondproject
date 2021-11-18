from flask import Blueprint, request
from flask_login import login_required
from app.models import db, User, Like, Tweet, Comment
from datetime import datetime as dt


like_routes = Blueprint("likes", __name__)


# Get Likes For Tweet
@like_routes.route('/<int:tweet_id>', methods =['GET'])
@login_required
def get_the_likes(tweet_id):
    likes = db.session.query(Like).filter(Like.tweet_id==tweet_id).count()
    return {"likes": likes}


# POST Tweet
@like_routes.route('/add', methods =['PUT'])
@login_required
def post_a_like():
    data = request.json
    like = Like(
        user_id = data["user_id"],
        tweet_id = data["tweet_id"],
    )
    db.session.add(like)
    db.session.commit()

    tweet = Tweet.query.get(data["tweet_id"])
    tweet_dict = tweet.to_dict()
    user = User.query.get(tweet_dict["user_id"])
    tweet_dict["user"] = user.to_dict()

    comment_count = db.session.query(Comment).filter(Comment.tweet_id==tweet_dict["id"]).count()
    like_array = db.session.query(Like).filter(Like.tweet_id==tweet_dict["id"]).all()

    tweet_dict["comment_count"] = comment_count
    tweet_dict["like_count"] = len(like_array)
    tweet_dict["like_array"] = [like.to_dict() for like in like_array]


    return {"tweet": tweet_dict}


# DELETE Tweet
@like_routes.route('/delete/<int:like_id>', methods =['DELETE'])
@login_required
def delete_a_like(like_id):
    db.session.query(Like).filter(Like.id==like_id).delete()
    db.session.commit()

    return {"like_id": like_id}
