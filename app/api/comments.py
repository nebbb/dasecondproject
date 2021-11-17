from flask import Blueprint, request
from flask_login import login_required
from app.models import db, User, Comment


comment_routes = Blueprint("comments", __name__)
