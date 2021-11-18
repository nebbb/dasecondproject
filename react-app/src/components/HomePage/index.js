import React, { useEffect } from "react";
import HomeTweets from "../HomeTweets";
import "./HomePage.css";
import { useSelector, useDispatch } from "react-redux";
import { loadHomeTweets } from "../../store/tweets";
import { loadHomeUsers } from "../../store/users";
import LeftSideBar from "../LeftSideBar";
import RightSideBar from "../RightSideBar";

export default function HomePage() {
  const dispatch = useDispatch();
  const tweets = useSelector((state) => Object.values(state.tweets).reverse());
  const users = useSelector((state) => Object.values(state.users));

  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(loadHomeTweets()).then(() => dispatch(loadHomeUsers()));
  }, [dispatch]);
  return (
    <div className="home__page--container">
      <LeftSideBar user={user} />
      <HomeTweets tweets={tweets} user={user} />
      <RightSideBar users={users} />
    </div>
  );
}
