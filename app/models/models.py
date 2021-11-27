from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    name = db.Column(db.String(40))
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_pic = db.Column(db.String(255) , default='https://twittabucket.s3.us-east-2.amazonaws.com/default_profile_400x400.png')
    banner_pic = db.Column(db.String(255), default='')
    description = db.Column(db.Text)
    dark = db.Column(db.Boolean, default=True, nullable=False)
    created_at= db.Column(db.Date, nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile_pic': self.profile_pic,
            'description': self.description,
            'dark': self.dark,
            'name': self.name,
            'banner_pic': self.banner_pic,
            'created_at': self.created_at,
        }


class Tweet(db.Model):
    __tablename__ = 'tweets'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False, )
    tweet = db.Column(db.Text, nullable=False)
    image = db.Column(db.Text)
    pinned = db.Column(db.Boolean, default=False, nullable=False)
    sent_date = db.Column(db.DateTime(timezone=False), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'tweet': self.tweet,
            'image': self.image,
            'pinned': self.pinned,
            'sent_date': self.sent_date,
        }

class DMChannel(db.Model):
    __tablename__ = 'dmchannels'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False, )
    user_id2 = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False, )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user_id2': self.user_id2,
        }


class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False, )
    reciever = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False, )
    dm_channel_id = db.Column(db.Integer, db.ForeignKey("dmchannels.id", ondelete='CASCADE'), nullable=False)
    message = db.Column(db.Text, nullable=False)
    sent_date = db.Column(db.DateTime(timezone=False), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'sender': self.sender,
            'reciever': self.reciever,
            'dm_channel_id': self.dm_channel_id,
            'message': self.message,
            'sent_date': self.sent_date,
        }

class Like(db.Model):
    __tablename__ = 'likes'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False, )
    tweet_id = db.Column(db.Integer, db.ForeignKey("tweets.id", ondelete='CASCADE'), nullable=False, )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'tweet_id': self.tweet_id,
        }


class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False, )
    tweet_id = db.Column(db.Integer, db.ForeignKey("tweets.id", ondelete='CASCADE'), nullable=False, )
    comment = db.Column(db.Text, nullable=False)
    sent_date = db.Column(db.DateTime(timezone=False), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'tweet_id': self.tweet_id,
            'comment': self.comment,
            'sent_date': self.sent_date
        }

    # user = db.relationship("User", back_populates="tweet")
    # tweet = db.relationship("Tweet", back_populates="tweet")

class Follow(db.Model):
    __tablename__ = 'follows'
    id = db.Column(db.Integer, primary_key=True)
    sender = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False, )
    reciever = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False, )

    def to_dict(self):
        return {
            'id': self.id,
            'sender': self.sender,
            'reciever': self.reciever,
        }


class Bookmark(db.Model):
    __tablename__ = 'bookmarks'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete='CASCADE'), nullable=False, )
    tweet_id = db.Column(db.Integer, db.ForeignKey("tweets.id", ondelete='CASCADE'), nullable=False, )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'tweet_id': self.tweet_id,
        }



class Notification(db.Model):
    __tablename__ = 'notifications'
    id = db.Column(db.Integer, primary_key=True)
    reciever = db.Column(db.Integer)
    sender = db.Column(db.Integer)
    message = db.Column(db.String)
    link = db.Column(db.String)
    read = db.Column(db.Boolean, default=False )

    def to_dict(self):
        return {
            'id': self.id,
            'reciever': self.reciever,
            'sender': self.sender,
            'message': self.message,
            'link': self.link,
            'read': self.read,
        }
