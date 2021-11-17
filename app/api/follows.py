from flask import Blueprint, request
from flask_login import login_required
from app.models import db, User, Follow


follow_routes = Blueprint("follows", __name__)
