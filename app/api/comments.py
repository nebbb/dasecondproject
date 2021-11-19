from flask import Blueprint, request
from flask_login import login_required
from app.models import db, User, Comment
from datetime import datetime as dt


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
    db.session.add(comment)
    db.session.commit()

    user = User.query.get(data["user_id"])

    comment_dict = comment.to_dict()
    comment_dict["user"] = user.to_dict()


    return {"comment": comment_dict}


# DELETE Comment
@comment_routes.route('/delete/<int:comment_id>', methods =['DELETE'])
@login_required
def delete_a_comment(comment_id):
    db.session.query(Comment).filter(Comment.id==comment_id).delete()
    db.session.commit()

    return {"comment_id": comment_id}
