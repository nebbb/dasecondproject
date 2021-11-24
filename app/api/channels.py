from flask import Blueprint, request
from flask_login import login_required
from app.models import db, User, Message, DMChannel
from datetime import datetime as dt
from sqlalchemy import or_


channel_routes = Blueprint("channels", __name__)


# Get Channels For User
@channel_routes.route('/all/<int:user_id>', methods =['GET'])
@login_required
def get_the_channels(user_id):
    channels = db.session.query(DMChannel).filter(or_(DMChannel.user_id == user_id, DMChannel.user_id2 == user_id)).all()
    channel_loop = []

    for channel in channels:
        channel_dict = channel.to_dict()

        user1 = User.query.get(channel_dict["user_id"])
        user2 = User.query.get(channel_dict["user_id2"])

        channel_dict["user_id"] = user1.to_dict()
        channel_dict["user_id2"] = user2.to_dict()

        channel_loop.append(channel_dict)


    return {"channels": channel_loop}


#POST Channel
@channel_routes.route('/post', methods =['POST'])
@login_required
def post_a_comment():
    data = request.json
    channel = DMChannel(
        user_id = data["user_id"],
        user_id2 = data["user_id2"],
        sent_date = dt.now()
    )
    db.session.add(channel)
    db.session.commit()

    # user = User.query.get(data["user_id"])

    # comment_dict = comment.to_dict()
    # comment_dict["user"] = user.to_dict()


    return {"channel": channel.to_dict()}


# # DELETE Comment
# @channel_routes.route('/delete/<int:comment_id>', methods =['DELETE'])
# @login_required
# def delete_a_comment(comment_id):
#     db.session.query(Comment).filter(Comment.id==comment_id).delete()
#     db.session.commit()

#     return {"comment_id": comment_id}
