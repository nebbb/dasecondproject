const LOAD = "search/LOAD";

const load = (results) => ({
  type: LOAD,
  results,
});

export const searchResults = (data) => async (dispatch) => {
  const response = await fetch(`/api/users/search`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const results = await response.json();
    dispatch(load(results["users"]));
  }
};

const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const newState = {};
      for (let result of action.results) {
        newState[result.id] = result;
      }
      return newState;
    default:
      return state;
  }
};

export default searchReducer;
