import React from "react";
import "./NotificationsSection.css";
import { useHistory } from "react-router";
import { removeNotification } from "../../store/notifications";
import { useDispatch } from "react-redux";

export default function NotificationsSection({ notifications }) {
  const dispatch = useDispatch();
  const history = useHistory();

  function removeNotificationFun(id, link) {
    dispatch(removeNotification(id)).then(() => history.push(link));
  }

  return (
    <div className="notifications__section--container">
      <div>
        {notifications &&
        notifications?.filter(
          (notification) => notification.sender !== notification.reciever
        )?.length <= 0 ? (
          <div className="notification-container">
            {/* <span>🚫</span> */}
            <img src="https://img.icons8.com/cute-clipart/64/000000/sad.png" />
            <h3 className="notification-none__text">No new notifications</h3>
          </div>
        ) : null}
        {notifications &&
          notifications.map((notification) => {
            if (notification?.sender !== notification?.reciever) {
              return (
                <div
                  key={notification?.id}
                  className="notification__card--container"
                  onClick={() =>
                    removeNotificationFun(notification.id, notification.link)
                  }
                >
                  <div className="notification__card--container-left">
                    <img src={notification?.user.profile_pic} />
                  </div>
                  <div className="notification__card--container-right">
                    <span>{notification?.message}</span>
                  </div>
                  <div className="notification__svg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="34"
                      height="34"
                      viewBox="0 0 172 172"
                    >
                      <g
                        fill="none"
                        fill-rule="nonzero"
                        stroke="none"
                        stroke-width="1"
                        stroke-linecap="butt"
                        stroke-linejoin="miter"
                        stroke-miterlimit="10"
                        stroke-dasharray=""
                        stroke-dashoffset="0"
                        font-family="none"
                        font-weight="none"
                        font-size="none"
                        text-anchor="none"
                      >
                        <path d="M0,172v-172h172v172z" fill="none"></path>
                        <g>
                          <path
                            d="M86,7.16667l16.1465,18.02058l23.27017,-7.27058l5.24958,23.41708l23.41708,5.24958l-7.16667,23.27017l17.91667,16.1465l-17.91667,16.1465l7.16667,23.27017l-23.41708,5.24958l-5.24958,23.41708l-23.27017,-7.27058l-16.1465,18.02058l-16.1465,-18.02058l-23.27017,7.27058l-5.24958,-23.41708l-23.41708,-5.24958l7.16667,-23.27017l-17.91667,-16.1465l17.91667,-16.1465l-7.16667,-23.27017l23.41708,-5.24958l5.24958,-23.41708l23.27017,7.27058z"
                            fill="#1d9bf0"
                          ></path>
                          <path
                            d="M63.78692,103.91667h-7.16667l-10.75,-23.65717v23.65717h-7.16667v-35.83333h7.16667l10.75,23.65717v-23.65717h7.16667zM90.66192,88.50475h-11.1155v9.67142h13.25475v5.7405h-20.42142v-35.83333h20.42142v6.08808h-13.25475v8.24525h11.1155zM122.54642,90.66192l3.23575,-22.57858h7.16667l-6.45358,35.83333h-7.16667l-4.29642,-21.1345l-3.58333,21.1345h-7.16667l-6.45358,-35.83333h7.16667l3.21783,22.57858l4.29642,-22.57858h6.10242z"
                            fill="#ffffff"
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}
