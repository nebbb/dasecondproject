import React from "react";
import "./WhoToFollow.css";
import FollowUserCard from "../FollowUserCard";

export default function WhoToFollow({ users }) {
  return (
    <div className="who-to-follow__container">
      <h3>Who to follow</h3>
      <div className="who-to-follow__inner">
        {users &&
          users.map((user) => <FollowUserCard user={user} key={user?.id} />)}
      </div>
      <span className="who-to-follow-span">Show more</span>
    </div>
  );
}
