import React from "react";
import "./BookmarkSection.css";

export default function BookmarkSection({ user }) {
  return (
    <div className="bookmark__section">
      <div className="home__tweets--home home__tweets--home--tweet home__tweets--home--tweet-book">
        <span>Bookmarks</span>
        <p>{`@${user.username}`}</p>
      </div>
    </div>
  );
}
