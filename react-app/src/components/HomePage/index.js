import React, { useEffect } from "react";
import HomeTweets from "../HomeTweets";
import "./HomePage.css";
import { useSelector, useDispatch } from "react-redux";
import { loadHomeTweets } from "../../store/tweets";
import LeftSideBar from "../LeftSideBar";
import RightSideBar from "../RightSideBar";

export default function HomePage() {
  const dispatch = useDispatch();
  const tweets = useSelector((state) => Object.values(state.tweets).reverse());
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(loadHomeTweets());
  }, [dispatch]);
  return (
    <div className="home__page--container">
      <LeftSideBar />
      <HomeTweets tweets={tweets} user={user} />
      <RightSideBar />
    </div>
  );
}
