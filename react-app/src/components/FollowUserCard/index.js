import React from "react";
import "./FollowUserCard.css";

export default function FollowUserCard({ user }) {
  return (
    <div className="follow__user-card">
      <div className="follow__user-left">
        <img
          src={user["profile_pic"]}
          alt="profile-pic"
          className="follow__card-profile-pic"
        />
        <div>
          <span className="follow__card-profile-name">{`${user.name}`}</span>
          <span className="follow__card-profile-username">{`@${user.username}`}</span>
        </div>
      </div>
      <div className="follow__user-right">
        <button className="follow__card-btn">Follow</button>
      </div>
    </div>
  );
}
