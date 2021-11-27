import React from "react";
import "./ChannelSection.css";

export default function ChannelCard({ channel, user, setSelectedChannel }) {
  const otherUser = channel?.user_id.id === user.id ? "user_id2" : "user_id";

  return (
    <div
      className="channel__card--container"
      onClick={() => setSelectedChannel(channel)}
    >
      <img src={channel[otherUser].profile_pic} alt="profile-pic" />
      <div className="channel__card--text">
        <span>{channel[otherUser].name}</span>
        <span className="channel__card--text-2">{`@${channel[otherUser].username}`}</span>
      </div>
    </div>
  );
}
