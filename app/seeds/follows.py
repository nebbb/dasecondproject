from app.models import db, Follow

def seed_follows():
    follow1 = Follow(sender=1, reciever=2)
    db.session.add(follow1)
    db.session.commit()

def undo_follows():
    db.session.execute('TRUNCATE follows RESTART IDENTITY CASCADE;')
    db.session.commit()
