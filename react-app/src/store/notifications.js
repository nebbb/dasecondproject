const LOAD = "notification/LOAD";

const load = (notifications) => ({
  type: LOAD,
  notifications,
});

export const loadTheNotifications = (data) => async (dispatch) => {
  const response = await fetch(`/api/notifications/all/${data["user_id"]}`);

  if (response.ok) {
    const notifications = await response.json();
    dispatch(load(notifications["notifications"]));
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
    default:
      return state;
  }
};

export default notificationsReducer;
