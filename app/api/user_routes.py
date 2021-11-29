from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Follow, Tweet, Like, Bookmark
from app.models.models import Comment


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/search', methods=["PUT"])
@login_required
def search_users():
    data = request.json
    users = User.query.filter(User.username.ilike(f'%{data["input"]}%')).all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/user/<int:id>')
@login_required
def get_a_user(id):
    user = User.query.get(id)
    user_dict = user.to_dict()

    tweets = db.session.query(Tweet).filter(Tweet.user_id==id).all()
    the_likes = db.session.query(Like).filter(Like.user_id==id).all()
    follows = db.session.query(Follow).filter(Follow.sender==id).all()
    followers = db.session.query(Follow).filter(Follow.reciever==id).all()

    tweet_loop = []
    like_loop = []

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

    for like in the_likes:
        like_dict = like.to_dict()
        tweet = Tweet.query.get(like_dict["tweet_id"])
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

        like_loop.append(tweet_dict)



    user_dict["tweets"] = tweet_loop
    user_dict["likes"] = like_loop
    user_dict["following"] = [follow.to_dict() for follow in follows]
    user_dict["followers"] = [follow.to_dict() for follow in followers]



    return {'user': user_dict}



@user_routes.route('/follow')
@login_required
def load_users():
    users = User.query.limit(4).all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/follow/users/<int:id>')
@login_required
def load_follow_users(id):
    follows = db.session.query(Follow).filter(Follow.sender==id).all()
    follows_ids = []
    for follow in follows:
        follow_dict = follow.to_dict()
        follows_ids.append(follow_dict["reciever"])

    users = User.query.all()

    num = 0
    dynamic_array = []

    for user in users:
        user_dict = user.to_dict()

        if num <= 3:
            if user_dict["id"] not in follows_ids:
                if user_dict["id"] is not id:
                    dynamic_array.append(user_dict)
                    num += 1



    return {'users': dynamic_array}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# Update Tweet
@user_routes.route('/update/<int:id>', methods =['PUT'])
@login_required
def update_a_user(id):
    user = User.query.get(id)
    data = request.json

    user.name = data["name"]
    user.description = data["description"]
    db.session.commit()

    return {"user": user.to_dict()}
