const LOAD = "finds/LOAD";

const load = (finds) => ({
  type: LOAD,
  finds,
});

export const loadTheFinds = (data) => async (dispatch) => {
  const response = await fetch(`/api/channels/find/${data["user_id"]}`);

  if (response.ok) {
    const finds = await response.json();
    dispatch(load(finds["users"]));
  }
};

const findsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const newState = {};
      for (let find of action.finds) {
        newState[find.id] = find;
      }
      return newState;
    default:
      return state;
  }
};

export default findsReducer;
