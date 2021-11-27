from flask import Blueprint, request
from flask_login import login_required
from app.models import db, User, Message
from datetime import datetime as dt

message_routes = Blueprint("messages", __name__)

# Get Messages For Channel
@message_routes.route('/all/<int:channel_id>', methods =['GET'])
@login_required
def get_the_messages(channel_id):
    messages = db.session.query(Message).filter(Message.dm_channel_id == channel_id).all()
    message_loop = []

    for message in messages:
        message_dict = message.to_dict()

        user = User.query.get(message_dict["sender"])
        message_dict["sender"] = user.to_dict()

        message_loop.append(message_dict)


    return {"messages": message_loop}


#POST Message
@message_routes.route('/post', methods =['POST'])
@login_required
def post_a_message():
    data = request.json
    message = Message(
        sender = data["sender"],
        reciever = data["reciever"],
        dm_channel_id = data["dm_channel_id"],
        message = data["message"],
        sent_date = dt.now()
    )
    db.session.add(message)
    db.session.commit()


    return {"message": message.to_dict()}
