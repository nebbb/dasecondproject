from app.models import db, Comment
from datetime import datetime as dt

def seed_comments():
    comment1 = Comment(user_id=1, tweet_id=1, comment='nice!', sent_date=dt.now())
    db.session.add(comment1)
    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
