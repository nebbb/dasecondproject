import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import LeftSideBar from "../LeftSideBar";
import RightSideBar from "../RightSideBar";
import TweetDetails from "../TweetDetails";
import { loadSingleTweet } from "../../store/tweets";
import { loadHomeUsers } from "../../store/users";
import { loadDynamicUsers } from "../../store/users";
import "./TweetPage.css";

export default function TweetPage() {
  const dispatch = useDispatch();
  const { tweetId } = useParams();
  const user = useSelector((state) => state.session.user);
  const users = useSelector((state) => Object.values(state.users));
  const tweet = useSelector((state) => state.tweets);

  useEffect(() => {
    dispatch(loadSingleTweet(tweetId)).then(() =>
      dispatch(loadDynamicUsers(user.id))
    );
  }, [tweetId]);

  return (
    <div className="tweet__page--container">
      <LeftSideBar user={user} />
      <TweetDetails tweet={tweet[tweetId]} user={user} />
      <RightSideBar users={users} />
    </div>
  );
}
