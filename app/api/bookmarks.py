from flask import Blueprint, request
from flask_login import login_required
from app.models import db, User, Bookmark, Tweet, Like, Comment


bookmark_routes = Blueprint("bookmarks", __name__)

# Get Likes For Tweet
@bookmark_routes.route('/<int:user_id>', methods =['GET'])
@login_required
def get_the_bookmarks(user_id):
    bookmarks = db.session.query(Bookmark).filter(Bookmark.user_id==user_id).all()

    loop = []

    for bookmark in bookmarks:
        bookmark_dict = bookmark.to_dict()
        tweet = Tweet.query.get(bookmark_dict["tweet_id"])
        tweet_dict = tweet.to_dict()
        user = User.query.get(tweet_dict["user_id"])
        like_array = db.session.query(Like).filter(Like.tweet_id==tweet_dict["id"]).all()
        comment_array = db.session.query(Comment).filter(Comment.tweet_id==tweet_dict["id"]).all()
        bookmark_array = db.session.query(Bookmark).filter(Bookmark.tweet_id==tweet_dict["id"]).all()

        tweet_dict["user"] = user.to_dict()
        tweet_dict["like_count"] = len(like_array)
        tweet_dict["comment_count"] = len(comment_array)
        tweet_dict["like_array"] = [like.to_dict() for like in like_array]
        tweet_dict["comment_array"] = [comment.to_dict() for comment in comment_array]
        tweet_dict["bookmark_array"] = [bookmark.to_dict() for bookmark in bookmark_array]

        loop.append(tweet_dict)


    return {"bookmarks": loop}


# POST Tweet
@bookmark_routes.route('/add', methods =['POST'])
@login_required
def post_a_bookmark():
    data = request.json
    bookmark = Bookmark(
        user_id = data["user_id"],
        tweet_id = data["tweet_id"],
    )
    db.session.add(bookmark)
    db.session.commit()

    return {"bookmark": bookmark.to_dict()}


# DELETE Tweet
@bookmark_routes.route('/delete/<int:bookmark_id>', methods =['DELETE'])
@login_required
def delete_a_like(bookmark_id):
    db.session.query(Bookmark).filter(Bookmark.id==bookmark_id).delete()
    db.session.commit()

    return {"bookmark_id": bookmark_id}
