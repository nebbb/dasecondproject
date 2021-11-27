import React from "react";
import "./NotificationsSection.css";
import { useHistory } from "react-router";

export default function NotificationsSection({ notifications }) {
  const history = useHistory();
  return (
    <div className="notifications__section--container">
      <div>
        {notifications &&
          notifications.map((notification) => {
            if (notification?.sender !== notification?.reciever) {
              return (
                <div
                  className="notification__card--container"
                  onClick={() => history.push(notification?.link)}
                >
                  <div className="notification__card--container-left">
                    <img src={notification?.user.profile_pic} />
                  </div>
                  <div className="notification__card--container-right">
                    <span>{notification?.message}</span>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}
