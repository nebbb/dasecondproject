const LOAD = "tweets/LOAD";
const ADD = "tweets/ADD";
const REMOVE = "tweets/REMOVE";
const REMOVE_LIKE = "tweets/REMOVELIKE";
const ADD_COMMENT = "comments/ADD";
const REMOVE_COMMENT = "comments/REMOVE";
const ADD_BOOKMARK = "bookmarks/ADD";
const REMOVE_BOOKMARK = "bookmarks/REMOVE";

const load = (tweets) => ({
  type: LOAD,
  tweets,
});

const add = (tweet) => ({
  type: ADD,
  tweet,
});

const remove = (tweet_id) => ({
  type: REMOVE,
  tweet_id,
});

const removeLike = (data) => ({
  type: REMOVE_LIKE,
  data,
});

const addComment = (data) => ({
  type: ADD_COMMENT,
  data,
});

const removeComment = (data) => ({
  type: REMOVE_COMMENT,
  data,
});

const addBookmark = (bookmark) => ({
  type: ADD_BOOKMARK,
  bookmark,
});

const removeBookmark = (data) => ({
  type: REMOVE_BOOKMARK,
  data,
});

export const loadHomeTweets = () => async (dispatch) => {
  const response = await fetch(`/api/tweets/home`);

  if (response.ok) {
    const tweets = await response.json();
    dispatch(load(tweets["tweets"]));
  }
};

export const loadSingleTweet = (tweet_id) => async (dispatch) => {
  const response = await fetch(`/api/tweets/${tweet_id}`);

  if (response.ok) {
    const tweets = await response.json();
    dispatch(load(tweets["tweet"]));
  }
};

export const addTweet = (formData) => async (dispatch) => {
  const { user_id, tweet, image } = formData;
  const form = new FormData();
  form.append("user_id", user_id);
  form.append("tweet", tweet);
  form.append("image", image);

  // const response = await fetch("/api/tweets/add", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(formData),
  // });

  // if (response.ok) {
  //   const tweet = await response.json();

  //   dispatch(add(tweet["tweet"]));
  // }

  const response = await fetch("/api/file/add", {
    method: "POST",
    body: form,
  });

  if (response.ok) {
    const tweet = await response.json();

    dispatch(add(tweet["tweet"]));
  }
};

export const addAComment = (formData) => async (dispatch) => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const comment = await response.json();

    dispatch(addComment(comment["comment"]));
  }
};

export const addABookmarkFromTweets = (formData) => async (dispatch) => {
  const response = await fetch("/api/bookmarks/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const bookmark = await response.json();

    dispatch(addBookmark(bookmark["bookmark"]));
  }
};

export const removeABookmarkFromTweets = (data) => async (dispatch) => {
  const response = await fetch(`/api/bookmarks/delete/${data["bookmark_id"]}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const bookmark_id = await response.json();
    console.log("INSIDE TWEET REDUCER");
    dispatch(removeBookmark(data));
  }
};

export const updateTweet = (formData) => async (dispatch) => {
  const response = await fetch(`/api/tweets/${formData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const tweet = await response.json();

    dispatch(add(tweet["tweet"]));
  }
};

export const likeATweet = (formData) => async (dispatch) => {
  const response = await fetch(`/api/likes/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const tweet = await response.json();
    dispatch(add(tweet["tweet"]));
  }
};

export const removeLikedTweet = (data) => async (dispatch) => {
  const response = await fetch(`/api/likes/delete/${data["like_id"]}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const like_id = await response.json();
    dispatch(removeLike(data));
  }
};

export const deleteCommentTweet = (data) => async (dispatch) => {
  const response = await fetch(`/api/comments/delete/${data["comment_id"]}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const comment_id = await response.json();
    dispatch(removeComment(data));
  }
};

export const removeTweet = (tweet_id) => async (dispatch) => {
  const response = await fetch(`/api/tweets/delete/${tweet_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const tweet = await response.json();
    dispatch(remove(tweet["tweet_id"]));
  }
};

const tweetsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const newState = {};
      if (Array.isArray(action.tweets)) {
        for (let tweet of action.tweets) {
          newState[tweet.id] = tweet;
        }
        return newState;
      } else {
        newState[action.tweets.id] = action.tweets;
        return newState;
      }
    case ADD:
      return { ...state, [action.tweet.id]: action.tweet };
    case REMOVE:
      const tweets = { ...state };
      delete tweets[action.tweet_id];
      return tweets;
    case REMOVE_LIKE:
      function getLikeObject(object) {
        return object["id"] === action.data.like_id;
      }
      const oldTweetArray = { ...state };
      const oldTweet = oldTweetArray[action.data.tweet_id];
      if (oldTweet["like_count"] > 0) oldTweet["like_count"]--;
      const index = oldTweet["like_array"].findIndex(getLikeObject);
      oldTweet["like_array"].splice(index, 1);
      return { ...state, [action.data.tweet_id]: oldTweet };
    case REMOVE_COMMENT:
      function getCommentObject(object) {
        return object["id"] === action.data.comment_id;
      }
      const oldTweetArrayTwo = { ...state };
      const oldTweetTwo = oldTweetArrayTwo[action.data.tweet_id];
      if (oldTweetTwo["comment_count"] > 0) oldTweetTwo["comment_count"]--;
      const indexTwo = oldTweetTwo["comment_array"].findIndex(getCommentObject);
      oldTweetTwo["comment_array"].splice(indexTwo, 1);
      return { ...state, [action.data.tweet_id]: oldTweetTwo };
    case ADD_COMMENT:
      // function getLikeObject(object) {
      //   return object["id"] === action.data.like_id;
      // }
      // const oldTweetArray = { ...state };
      // const oldTweet = oldTweetArray[action.data.tweet_id];
      // if (oldTweet["like_count"] > 0) oldTweet["like_count"]--;
      // const index = oldTweet["like_array"].findIndex(getLikeObject);
      // oldTweet["like_array"].splice(index, 1);
      // return { ...state, [action.data.tweet_id]: oldTweet };
      const oldData = { ...state };
      const oldTweetArrayObj = oldData[action.data.tweet_id];
      oldTweetArrayObj["comment_count"]++;
      oldTweetArrayObj["comment_array"].push(action.data);
      return { ...state, [action.data.tweet_id]: oldTweetArrayObj };
    case ADD_BOOKMARK:
      const oldTweetData = { ...state };
      const targetTweetObject = oldTweetData[action.bookmark.tweet_id];
      const targetTweetBookmarkArray = targetTweetObject["bookmark_array"];
      targetTweetBookmarkArray.push(action.bookmark);
      return oldTweetData;
    case REMOVE_BOOKMARK:
      function getTheBookmark(object) {
        return object["id"] === action.data.bookmark_id;
      }
      const oldUserData = { ...state };
      const currentUserTweet = oldUserData[action.data.tweet_id];
      const bookmarkArray = currentUserTweet["bookmark_array"];
      const bookmarkIndex = bookmarkArray.findIndex(getTheBookmark);
      bookmarkArray.splice(bookmarkIndex, 1);
      return { ...state, [action.data.tweet_id]: currentUserTweet };
    default:
      return state;
  }
};

export default tweetsReducer;
