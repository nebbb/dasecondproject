const LOAD = "tweets/LOAD";
const ADD = "tweets/ADD";
const REMOVE = "tweets/REMOVE";
const REMOVE_LIKE = "tweets/REMOVELIKE";

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

export const loadHomeTweets = () => async (dispatch) => {
  const response = await fetch(`/api/tweets/home`);

  if (response.ok) {
    const tweets = await response.json();
    dispatch(load(tweets["tweets"]));
  }
};

export const addTweet = (formData) => async (dispatch) => {
  const response = await fetch("/api/tweets/add", {
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
      for (let tweet of action.tweets) {
        newState[tweet.id] = tweet;
      }
      return newState;
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
    default:
      return state;
  }
};

export default tweetsReducer;
