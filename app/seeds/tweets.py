from app.models import db, Tweet
from datetime import datetime as dt

def seed_tweets():
    tweet1 = Tweet(user_id=1, tweet='Hey first tweet!', image='https://pbs.twimg.com/media/FEWACCCWUAA2M93?format=jpg&name=large', sent_date=dt.now())
    db.session.add(tweet1)
    db.session.commit()

def undo_tweets():
    db.session.execute('TRUNCATE tweets RESTART IDENTITY CASCADE;')
    db.session.commit()
