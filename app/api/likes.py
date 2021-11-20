from flask import Blueprint, request
from flask_login import login_required
from app.models import db, User, Like, Tweet, Comment, Bookmark
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

    comment_array = db.session.query(Comment).filter(Comment.tweet_id==tweet_dict["id"]).all()
    like_array = db.session.query(Like).filter(Like.tweet_id==tweet_dict["id"]).all()
    bookmark_array = db.session.query(Bookmark).filter(Bookmark.tweet_id==tweet_dict["id"]).all()

    comment_dict = []

    for comment in comment_array:
        comm_dict = comment.to_dict()
        user = User.query.get(comm_dict["user_id"])
        comm_dict["user"] = user.to_dict()
        comment_dict.append(comm_dict)

    tweet_dict["comment_count"] = len(comment_array)
    tweet_dict["like_count"] = len(like_array)
    tweet_dict["like_array"] = [like.to_dict() for like in like_array]
    tweet_dict["comment_array"] = comment_dict
    tweet_dict["bookmark_array"] = [bookmark.to_dict() for bookmark in bookmark_array]

    return {"tweet": tweet_dict}


# DELETE Tweet
@like_routes.route('/delete/<int:like_id>', methods =['DELETE'])
@login_required
def delete_a_like(like_id):
    db.session.query(Like).filter(Like.id==like_id).delete()
    db.session.commit()

    return {"like_id": like_id}


# POST Tweet
@like_routes.route('/add/simple', methods =['POST'])
@login_required
def post_a_like_simple():
    data = request.json
    like = Like(
        user_id = data["user_id"],
        tweet_id = data["tweet_id"],
    )
    db.session.add(like)
    db.session.commit()

    like_dict = like.to_dict()

    return {"like": like_dict}
