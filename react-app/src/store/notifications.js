const LOAD = "notification/LOAD";
const REMOVE = "notifications/REMOVE";

const load = (notifications) => ({
  type: LOAD,
  notifications,
});

const remove = (id) => ({
  type: REMOVE,
  id,
});

export const loadTheNotifications = (data) => async (dispatch) => {
  const response = await fetch(`/api/notifications/all/${data["user_id"]}`);

  if (response.ok) {
    const notifications = await response.json();
    dispatch(load(notifications["notifications"]));
  }
};

export const removeNotification = (notificationId) => async (dispatch) => {
  const response = await fetch(`/api/notifications/remove/${notificationId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const notification_id = await response.json();
    dispatch(remove(notification_id["notification_id"]));
  }
};

const notificationsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const newState = {};
      for (let notification of action.notifications) {
        newState[notification.id] = notification;
      }
      return newState;
    case REMOVE:
      const newNotifs = { ...state };
      delete newNotifs[action.id];
      return newNotifs;
    default:
      return state;
  }
};

export default notificationsReducer;
