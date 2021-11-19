const LOAD = "bookmarks/LOAD";

const load = (bookmarks) => ({
  type: LOAD,
  bookmarks,
});

export const loadBookmarks = (data) => async (dispatch) => {
  const response = await fetch(`/api/bookmarks/${data.user_id}`);

  if (response.ok) {
    const bookmarks = await response.json();
    dispatch(load(bookmarks["bookmarks"]));
  }
};

const bookmarksReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const newState = {};
      for (let bookmark of action.bookmarks) {
        newState[bookmark.id] = bookmark;
      }
      return newState;
    default:
      return state;
  }
};

export default bookmarksReducer;
