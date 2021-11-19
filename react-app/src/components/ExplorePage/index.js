import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadHomeUsers } from "../../store/users";

import "./ExplorePage.css";
import LeftSideBar from "../LeftSideBar";
import RightSideBar from "../RightSideBar";
import ExploreSection from "../ExploreSection";

export default function ExplorePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const users = useSelector((state) => Object.values(state.users));
  const tweets = useSelector((state) => state.tweets);

  useEffect(() => {
    dispatch(loadHomeUsers());
  }, []);

  return (
    <div className="explore_page__container">
      <LeftSideBar user={user} />
      <ExploreSection tweets={tweets} />
      <RightSideBar users={users} />
    </div>
  );
}
