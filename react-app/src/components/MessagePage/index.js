import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftSideBar from "../LeftSideBar";

export default function MessagePage() {
  const user = useSelector((state) => state.session.user);

  return (
    <div className="message__page--container">
      <LeftSideBar user={user} />
    </div>
  );
}
