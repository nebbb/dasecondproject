const LOAD = "users/LOAD";

const load = (users) => ({
  type: LOAD,
  users,
});

export const loadHomeUsers = () => async (dispatch) => {
  const response = await fetch(`/api/users/follow`);

  if (response.ok) {
    const users = await response.json();
    dispatch(load(users["users"]));
  }
};

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const newState = {};
      for (let user of action.users) {
        newState[user.id] = user;
      }
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
