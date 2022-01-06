const LOAD = "bookmarks/LOAD";
const REMOVE_BOOK2 = "bookmarks/REMOVEE";

const load = (bookmarks) => ({
  type: LOAD,
  bookmarks,
});

const removeTheBookmark2 = (data) => ({
  type: REMOVE_BOOK2,
  data,
});

export const loadBookmarks = (data) => async (dispatch) => {
  const response = await fetch(`/api/bookmarks/${data.user_id}`);

  if (response.ok) {
    const bookmarks = await response.json();
    dispatch(load(bookmarks["bookmarks"]));
  }
};

export const removeBookmarkFromBookmark = (data) => async (dispatch) => {
  const response = await fetch(`/api/bookmarks/delete/${data["bookmark_id"]}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const bookmark_id = await response.json();

    dispatch(removeTheBookmark2(data));
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
    case REMOVE_BOOK2:
      // function getTheBookmark2(object) {
      //   return object["id"] === action.data.bookmark_id;
      // }
      // const oldUserData9 = { ...state };
      // const currentUserTweet9 = oldUserData9[action.data.tweet_id];
      // const currentUserTweet9Bookmarks = currentUserTweet9["bookmark_array"];
      // const bookmarkIndex3 =
      //   currentUserTweet9Bookmarks.findIndex(getTheBookmark2);
      // currentUserTweet9Bookmarks.splice(bookmarkIndex3, 1);
      // return { ...state, [action.data.tweet_id]: currentUserTweet9 };
      const oldBookmarkState = { ...state };
      delete oldBookmarkState[action.data.tweet_id];
      return oldBookmarkState;
    default:
      return state;
  }
};

export default bookmarksReducer;
