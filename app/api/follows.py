from flask import Blueprint, request
from flask_login import login_required
from app.models import db, User, Follow, Notification


follow_routes = Blueprint("follows", __name__)


# POST Follow
@follow_routes.route('/add', methods =['POST'])
@login_required
def post_a_follow():
    data = request.json
    follow = Follow(
        sender = data["sender"],
        reciever = data["reciever"],
    )
    db.session.add(follow)
    db.session.commit()

    follow_dict = follow.to_dict()

    the_user = User.query.get(data["sender"])
    the_user_dict = the_user.to_dict()

    new_notif = Notification(reciever=data["reciever"], sender=data["sender"], message=f'{the_user_dict["username"]} has started following you.', link=f'/profile/{data["sender"]}')

    db.session.add(new_notif)
    db.session.commit()

    return {"follow": follow_dict}


# DELETE Follow
@follow_routes.route('/delete/<int:follow_id>', methods =['DELETE'])
@login_required
def delete_a_like(follow_id):
    db.session.query(Follow).filter(Follow.id==follow_id).delete()
    db.session.commit()

    return {"follow_id": follow_id}
