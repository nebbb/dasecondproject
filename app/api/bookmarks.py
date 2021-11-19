from flask import Blueprint, request
from flask_login import login_required
from app.models import db, User, Bookmark, Tweet, Like, Comment


bookmark_routes = Blueprint("bookmarks", __name__)

# Get Likes For Tweet
@bookmark_routes.route('/<int:user_id>', methods =['GET'])
@login_required
def get_the_likes(user_id):
    bookmarks = db.session.query(Bookmark).filter(Bookmark.user_id==user_id).all()

    loop = []

    for bookmark in bookmarks:
        bookmark_dict = bookmark.to_dict()
        tweet = Tweet.query.get(bookmark_dict["tweet_id"])
        tweet_dict = tweet.to_dict()
        user = User.query.get(bookmark_dict["user_id"])
        like_array = db.session.query(Like).filter(Like.tweet_id==tweet_dict["id"]).all()
        comment_array = db.session.query(Comment).filter(Comment.tweet_id==tweet_dict["id"]).all()

        tweet_dict["user"] = user.to_dict()
        tweet_dict["like_count"] = len(like_array)
        tweet_dict["comment_count"] = len(comment_array)
        tweet_dict["like_array"] = [like.to_dict() for like in like_array]
        tweet_dict["comment_array"] = [comment.to_dict() for comment in comment_array]

        loop.append(tweet_dict)


    return {"bookmarks": loop}


# POST Tweet
@bookmark_routes.route('/add', methods =['PUT'])
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

    return {"tweet": tweet_dict}


# DELETE Tweet
@bookmark_routes.route('/delete/<int:like_id>', methods =['DELETE'])
@login_required
def delete_a_like(like_id):
    db.session.query(Like).filter(Like.id==like_id).delete()
    db.session.commit()

    return {"like_id": like_id}
