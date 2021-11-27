from flask import Blueprint, request
from flask_login import login_required
from app.models import db, User, Comment, Notification
from datetime import datetime as dt

from app.models.models import Tweet


comment_routes = Blueprint("comments", __name__)


# # Get Comments For Tweet
# @comment_routes.route('/<int:tweet_id>', methods =['GET'])
# @login_required
# def get_the_comments(tweet_id):
#     comments = db.session.query(Comment).filter(Comment.tweet_id==tweet_id).count()
#     return {"comments": comments}


# POST Comment
@comment_routes.route('/add', methods =['POST'])
@login_required
def post_a_comment():
    data = request.json
    comment = Comment(
        user_id = data["user_id"],
        tweet_id = data["tweet_id"],
        comment = data["comment"],
        sent_date = dt.now()
    )

    comment_dict = comment.to_dict()


    the_tweet = Tweet.query.get(comment_dict["tweet_id"])
    the_tweet_dict = the_tweet.to_dict()
    the_user = User.query.get(the_tweet_dict["user_id"])
    the_user_dict = the_user.to_dict()

    the_commenter = User.query.get(comment_dict["user_id"])
    the_commenter_dict = the_commenter.to_dict()

    new_notif = Notification(reciever=the_user_dict["id"], sender=comment_dict["user_id"], message=f'{the_commenter_dict["username"]} commented on your tweet.', link=f'/status/{comment_dict["tweet_id"]}')

    db.session.add(comment)
    db.session.add(new_notif)
    db.session.commit()

    user = User.query.get(data["user_id"])

    comment_dict["user"] = user.to_dict()


    return {"comment": comment_dict}


# DELETE Comment
@comment_routes.route('/delete/<int:comment_id>', methods =['DELETE'])
@login_required
def delete_a_comment(comment_id):
    db.session.query(Comment).filter(Comment.id==comment_id).delete()
    db.session.commit()

    return {"comment_id": comment_id}
