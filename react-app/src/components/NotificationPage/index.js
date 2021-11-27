import React, { useEffect } from "react";
import "./NotificationPage.css";
import LeftSideBar from "../LeftSideBar";
import { useSelector, useDispatch } from "react-redux";
import NotificationsSection from "../NotificationsSection";
import { loadTheNotifications } from "../../store/notifications";

export default function NotificationPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const notifications = useSelector((state) =>
    Object.values(state.notifications)
  );
  useEffect(() => {}, []);

  return (
    <div className="notification__page--container">
      <LeftSideBar user={user} />
      <NotificationsSection notifications={notifications} />
    </div>
  );
}
