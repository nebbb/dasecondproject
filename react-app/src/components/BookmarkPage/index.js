import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBookmarks } from "../../store/bookmarks";
import "./BookmarkPage.css";
import BookmarkSection from "../BookmarkSection";
import LeftSideBar from "../LeftSideBar";
import RightSideBar from "../RightSideBar";
import { loadHomeUsers } from "../../store/users";

export default function BookmarkPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const users = useSelector((state) => Object.values(state.users));
  const bookmarks = useSelector((state) => Object.values(state.bookmarks));

  useEffect(() => {
    dispatch(loadBookmarks({ user_id: user.id })).then(() =>
      dispatch(loadHomeUsers())
    );
  }, []);

  return (
    <div className="bookmark__page--container">
      <LeftSideBar user={user} />
      <BookmarkSection user={user} bookmarks={bookmarks} />
      <RightSideBar users={users} />
    </div>
  );
}
