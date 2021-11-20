from flask import Blueprint, request
from flask_login import login_required
from app.models import db, User, Follow


follow_routes = Blueprint("follows", __name__)


# POST Tweet
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

    return {"follow": follow_dict}


# DELETE Tweet
@follow_routes.route('/delete/<int:follow_id>', methods =['DELETE'])
@login_required
def delete_a_like(follow_id):
    db.session.query(Follow).filter(Follow.id==follow_id).delete()
    db.session.commit()

    return {"follow_id": follow_id}
