const LOAD = "message/LOAD";
const ADD = "message/ADD";

const load = (messages) => ({
  type: LOAD,
  messages,
});

const add = (message) => ({
  type: ADD,
  message,
});

export const postAMessage = (data) => async (dispatch) => {
  const response = await fetch(`/api/messages/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const message = await response.json();
    dispatch(add(message["message"]));
  }
};

export const loadTheMessages = (data) => async (dispatch) => {
  const response = await fetch(`/api/messages/all/${data["channel_id"]}`);

  if (response.ok) {
    const messages = await response.json();
    dispatch(load(messages["messages"]));
  }
};

const messageReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const newState = {};
      for (let message of action.messages) {
        newState[message.id] = message;
      }
      return newState;
    case ADD:
      // return { ...state, [action.message.id]: action.message };
      return { ...state };

    default:
      return state;
  }
};

export default messageReducer;
