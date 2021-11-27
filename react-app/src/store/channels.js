const LOAD = "channel/LOAD";
const ADD = "channel/ADD";

const load = (channels) => ({
  type: LOAD,
  channels,
});

const add = (channel) => ({
  type: ADD,
  channel,
});

export const postAChannel = (data) => async (dispatch) => {
  const response = await fetch(`/api/channels/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const channel = await response.json();
    dispatch(add(channel["channel"]));
    return channel["channel"];
  }
};

export const loadTheChannels = (data) => async (dispatch) => {
  const response = await fetch(`/api/channels/all/${data["user_id"]}`);

  if (response.ok) {
    const channels = await response.json();
    dispatch(load(channels["channels"]));
  }
};

const channelReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const newState = {};
      for (let channel of action.channels) {
        newState[channel.id] = channel;
      }
      return newState;
    case ADD:
      return { ...state, [action.channel.id]: action.channel };
    default:
      return state;
  }
};

export default channelReducer;
