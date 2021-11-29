from app.models import db, Tweet
from datetime import datetime as dt

def seed_tweets():
    tweet1 = Tweet(user_id=1, tweet='First tweet!', image='https://pbs.twimg.com/media/FEWACCCWUAA2M93?format=jpg&name=large', sent_date=dt.now())
    tweet2 = Tweet(user_id=6, tweet='Guys OMG I love this game!', image='https://i.ytimg.com/vi/jEp9yyhwZFE/maxresdefault.jpg', sent_date=dt.now())
    tweet3 = Tweet(user_id=5, tweet='I look at this every night before I sleep 🌕', image='https://i.insider.com/5d939b852e22af3f020abf3d?width=1136&format=jpeg', sent_date=dt.now())
    tweet4 = Tweet(user_id=4, tweet='daTomato 🍅', image='https://ca-times.brightspotcdn.com/dims4/default/129d07e/2147483647/strip/true/crop/1421x1351+0+0/resize/840x799!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fc1%2F99%2F95996981234386c4e0a3e46464df%2Fsdut-tomato-a-20160902', sent_date=dt.now())
    db.session.add(tweet1)
    db.session.add(tweet2)
    db.session.add(tweet3)
    db.session.add(tweet4)
    db.session.commit()

def undo_tweets():
    db.session.execute('TRUNCATE tweets RESTART IDENTITY CASCADE;')
    db.session.commit()
