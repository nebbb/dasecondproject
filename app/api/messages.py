from flask import Blueprint, request
from flask_login import login_required
from app.models import db, User, Message


message_routes = Blueprint("messages", __name__)
