import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./BookmarkPage.css";
import BookmarkSection from "../BookmarkSection";
import LeftSideBar from "../LeftSideBar";
import RightSideBar from "../RightSideBar";
import { loadHomeUsers } from "../../store/users";

export default function BookmarkPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const users = useSelector((state) => Object.values(state.users));

  useEffect(() => {
    dispatch(loadHomeUsers());
  }, []);

  return (
    <div className="bookmark__page--container">
      <LeftSideBar user={user} />
      <BookmarkSection user={user} />
      <RightSideBar users={users} />
    </div>
  );
}
