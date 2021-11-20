from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, User, Follow, Tweet, Like, Bookmark
from app.models.models import Comment

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/user/<int:id>')
@login_required
def get_a_user(id):
    user = User.query.get(id)
    user_dict = user.to_dict()

    tweets = db.session.query(Tweet).filter(Tweet.user_id==id).all()
    likes = db.session.query(Like).filter(Like.user_id==id).all()
    follows = db.session.query(Follow).filter(Follow.sender==id).all()
    followers = db.session.query(Follow).filter(Follow.reciever==id).all()

    tweet_loop = []

    for tweet in tweets:
        tweet_dict = tweet.to_dict()

        comments = db.session.query(Comment).filter(Comment.tweet_id==tweet_dict["id"]).all()
        likes = db.session.query(Like).filter(Like.tweet_id==tweet_dict["id"]).all()
        bookmarks = db.session.query(Bookmark).filter(Bookmark.tweet_id==tweet_dict["id"]).all()
        user = User.query.get(tweet_dict["user_id"])


        tweet_dict["user"] = user.to_dict()
        tweet_dict["comment_count"] = len(comments)
        tweet_dict["comment_array"] = [comment.to_dict() for comment in comments]
        tweet_dict["like_count"] = len(likes)
        tweet_dict["like_array"] = [like.to_dict() for like in likes]
        tweet_dict["bookmark_array"] = [bookmark.to_dict() for bookmark in bookmarks]

        tweet_loop.append(tweet_dict)

    user_dict["tweets"] = tweet_loop
    user_dict["following"] = [follow.to_dict() for follow in follows]
    user_dict["followers"] = [follow.to_dict() for follow in followers]



    return {'user': user_dict}



@user_routes.route('/follow')
@login_required
def load_users():
    users = User.query.limit(3).all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
