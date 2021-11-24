from flask import Blueprint, request
from flask_login import login_required

from app.config import Config
from app.aws_s3 import upload_file_to_s3
from app.models import db, User, Tweet, Comment, Like, Bookmark
from datetime import datetime as dt

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


    if file_fallback_1 == 1:
        file_url_accepted = upload_file_to_s3(file_callback, Config.S3_BUCKET)
        user.profile_pic = file_url_accepted
    else:
        user.profile_pic = file_callback


    if file_fallback_2 == 1:
        file2_url_accepted = upload_file_to_s3(file_callback2, Config.S3_BUCKET)
        user.banner_pic = file2_url_accepted
    else:
        user.banner_pic = file_callback2

    db.session.commit()
    return {'user': user.to_dict()}


# POST Tweet
@file_routes.route('/add', methods =['POST'])
@login_required
def post_a_tweet():
    user_id_form = request.form.get("user_id")
    tweet_form = request.form.get("tweet")

    # if "image" not in request.files:
    #     image_form = None
    # else:
    #     image_form = upload_file_to_s3(request.files["image"], Config.S3_BUCKET)

    image_form = None if "image" not in request.files else upload_file_to_s3(request.files["image"], Config.S3_BUCKET)

    tweet = Tweet(
        user_id = user_id_form,
        tweet = tweet_form,
        image = image_form,
        sent_date = dt.now()
    )
    db.session.add(tweet)
    db.session.commit()

    tweet_dict = tweet.to_dict()
    user = User.query.get(tweet_dict["user_id"])
    tweet_dict["user"] = user.to_dict()

    comment_count = db.session.query(Comment).filter(Comment.tweet_id==tweet_dict["id"]).count()
    like_array = db.session.query(Like).filter(Like.tweet_id==tweet_dict["id"]).all()
    bookmark_array = db.session.query(Bookmark).filter(Bookmark.tweet_id==tweet_dict["id"]).all()

    tweet_dict["comment_count"] = comment_count
    tweet_dict["like_count"] = len(like_array)
    tweet_dict["like_array"] = [like.to_dict() for like in like_array]
    tweet_dict["bookmark_array"] = [bookmark.to_dict() for bookmark in bookmark_array]


    return {"tweet": tweet_dict}
