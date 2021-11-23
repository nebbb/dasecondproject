from flask import Blueprint, request
from flask_login import login_required

from app.config import Config
from app.aws_s3 import upload_file_to_s3
from app.models import db, User

#any other imports as needed

file_routes = Blueprint('file', __name__)

#Don't forget to register your Blueprint

@file_routes.route('/user', methods=['POST'])
@login_required
def upload_user_data():
    userId = request.form.get("user_id")
    user = User.query.get(userId)

    file_fallback_1 = 1
    file_fallback_2 = 1

    if "file" not in request.files:
        file_fallback_1 = 2

    if "file2" not in request.files:
        file_fallback_2 = 2


    file_callback = user.profile_pic if "file" not in request.files else request.files["file"]
    file_callback2 = user.banner_pic if "file2" not in request.files else request.files["file2"]

    print(f"Inside POST route.")

    if file_fallback_1 == 1:
        file_url_accepted = upload_file_to_s3(file_callback, Config.S3_BUCKET)
        print(f"\n\n\n{file_url_accepted}\n\n\n")
        user.profile_pic = file_url_accepted
    else:
        print(f"\n\n\n{file_callback}\n\n\n")
        user.profile_pic = file_callback


    if file_fallback_2 == 1:
        file2_url_accepted = upload_file_to_s3(file_callback2, Config.S3_BUCKET)
        user.banner_pic = file2_url_accepted
    else:
        user.banner_pic = file_callback2

    db.session.commit()
    return {'user': user.to_dict()}
