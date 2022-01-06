import React, { useEffect } from "react";
import "./BookmarkSection.css";
// import { useDispatch, useSelector } from "react-redux";
// import { loadBookmarks } from "../../store/bookmarks";
import TweetCard from "../TweetCard";

export default function BookmarkSection({ user, bookmarks }) {
  // const dispatch = useDispatch();
  // const bookmarks = useSelector((state) => Object.values(state.bookmarks));
  // useEffect(() => {
  //   dispatch(loadBookmarks({ user_id: user.id }));
  // }, []);

  return (
    <div className="bookmark__section">
      <div className="home__tweets--home home__tweets--home--tweet home__tweets--home--tweet-book">
        <span>Bookmarks</span>
        <p>{`@${user.username}`}</p>
      </div>
      <div>
        {bookmarks &&
          bookmarks.map((bookmark) => {
            // if (bookmark["bookmark_array"]?.length > 0) {
            return (
              <TweetCard
                user={user}
                tweet={bookmark}
                hide={true}
                key={bookmark?.id}
              />
            );
            // }
          })}
      </div>
    </div>
  );
}
