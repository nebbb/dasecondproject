import React from "react";
import "./FollowUserCard.css";
import { useHistory } from "react-router";

export default function FollowUserCard({ user }) {
  const history = useHistory();

  return (
    <div className="follow__user-card">
      <div className="follow__user-left">
        <img
          src={user["profile_pic"]}
          alt="profile-pic"
          className="follow__card-profile-pic"
          onClick={() => history.push(`/profile/${user.id}`)}
        />
        <div>
          <span
            className="follow__card-profile-name"
            onClick={() => history.push(`/profile/${user.id}`)}
          >{`${user.name}`}</span>
          <span
            className="follow__card-profile-username"
            onClick={() => history.push(`/profile/${user.id}`)}
          >{`@${user.username}`}</span>
        </div>
      </div>
      <div className="follow__user-right">
        <button className="follow__card-btn">Follow</button>
      </div>
    </div>
  );
}
