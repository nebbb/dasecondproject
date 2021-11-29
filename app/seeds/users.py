from app.models import db, User
from datetime import datetime as dt

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', name='Demo User', banner_pic='', password='password', description='This is a Demo account.', created_at=dt.now())
    marnie = User(
        username='marnie', email='marnie@aa.io', name='Marnie Bear', banner_pic='https://images6.fanpop.com/image/photos/39600000/Sparkle-Stars-Profile-Banner-smile19-39654242-946-250.jpg', password='password', profile_pic='https://unqpost.com/wp-content/uploads/2020/11/Very-Funny-Profile-Pictures.jpg', description='hi.......', created_at=dt.now())
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', name='Bobbie Rhino', banner_pic='https://wallpaperaccess.com/full/5252278.jpg', password='password', profile_pic='https://pbs.twimg.com/media/FEWACCCWUAA2M93?format=jpg&name=large', description='i like turtles', created_at=dt.now())

    nebbb = User(
        username='nebbb', email='neb@aa.io', name='spiderman', banner_pic='https://mmos.com/wp-content/uploads/2019/12/elder-scrolls-online-skyrim-tease-banner.jpg', password='password', profile_pic='https://avatarfiles.alphacoders.com/158/158644.jpg', description='daDescription', created_at=dt.now())

    revan = User(
        username='revan', email='revan@aa.io', name='Revan Fajardo', banner_pic='https://media.comicbook.com/2015/11/banner-kylo-158585.jpg', password='password', profile_pic='https://i.imgur.com/IGmthKs.jpg', description='Test Desc', created_at=dt.now())


    brandon = User(
        username='brandon', email='brandon@aa.io', name='Brandon Laursen', banner_pic='https://pbs.twimg.com/profile_banners/1261247524557352960/1589820879/1500x500', password='password', profile_pic='https://pbs.twimg.com/profile_images/1394133022845259779/nACWiJAe_400x400.jpg', description='This is Branson Laursen, and I LOVE Genshin Impact.', created_at=dt.now())

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(nebbb)
    db.session.add(revan)
    db.session.add(brandon)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
