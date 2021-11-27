const LOAD = "user/LOAD";
const FOLLOW = "user/FOLLOW";
const UNFOLLOW = "users/UNFOLLOW";
const ADDLIKE = "users/ADDLIKE";
const REMOVELIKE = "users/REMOVELIKE";
const REMOVETWEET = "users/REMOVETWEET";
const ADDBOOKMARKPROFILE = "users/ADDBOOKMARK";
const REMOVEBOOKMARKPROFILE = "users/REMOVEBOOKMARK";
const UPDATETWEET = "users/UPDATETWEET";
const UPDATEUSERPRO = "users/UPDATE";

const load = (user) => ({
  type: LOAD,
  user,
});

const follow = (follow) => ({
  type: FOLLOW,
  follow,
});

const unfollow = (follow_id) => ({
  type: UNFOLLOW,
  follow_id,
});

const likeTheTweet = (like) => ({
  type: ADDLIKE,
  like,
});

const UnlikeTheTweet = (data) => ({
  type: REMOVELIKE,
  data,
});

const removeBookmarkFromProfile = (data) => ({
  type: REMOVEBOOKMARKPROFILE,
  data,
});

const addABookmarkFromProfile = (data) => ({
  type: ADDBOOKMARKPROFILE,
  data,
});

const removeTheTweet = (tweet_id) => ({
  type: REMOVETWEET,
  tweet_id,
});

const updateTweetProfile = (tweet) => ({
  type: UPDATETWEET,
  tweet,
});

const updateUserProfile = (user) => ({
  type: UPDATEUSERPRO,
  user,
});

export const updateProfile = (formData) => async (dispatch) => {
  const response = await fetch(`/api/users/update/${formData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const user = await response.json();
    dispatch(updateUserProfile(user["user"]));
  }
};

export const changeProfileData = (formData) => async (dispatch) => {
  const { file, file2, user_id } = formData;
  const form = new FormData();
  form.append("file", file);
  form.append("file2", file2);
  form.append("user_id", user_id);
  const response = await fetch(`/api/file/user`, {
    method: "POST",
    body: form,
  });

  if (response.ok) {
    const returnData = await response.json();
    // dispatch(updateUserProfile(user["user"]));
  }
};

export const updateTweetFromProfile = (formData) => async (dispatch) => {
  const response = await fetch(`/api/tweets/${formData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const tweet = await response.json();

    dispatch(updateTweetProfile(tweet["tweet"]));
  }
};

export const loadSingleUser = (data) => async (dispatch) => {
  const response = await fetch(`/api/users/user/${data["user_id"]}`);

  if (response.ok) {
    const user = await response.json();
    dispatch(load(user["user"]));
  }
};

export const followAUser = (formData) => async (dispatch) => {
  const response = await fetch(`/api/follows/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const followObj = await response.json();
    dispatch(follow(followObj["follow"]));
  }
};

export const likeATweetFromProfile = (formData) => async (dispatch) => {
  const response = await fetch(`/api/likes/add/simple`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const like = await response.json();
    dispatch(likeTheTweet(like["like"]));
  }
};

export const bookmarkATweetFromProfile = (formData) => async (dispatch) => {
  const response = await fetch("/api/bookmarks/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    const bookmark = await response.json();
    dispatch(addABookmarkFromProfile(bookmark["bookmark"]));
  }
};

export const unBookmarkATweetFromProfile = (formData) => async (dispatch) => {
  const response = await fetch(
    `/api/bookmarks/delete/${formData["bookmark_id"]}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  if (response.ok) {
    const bookmark = await response.json();
    dispatch(removeBookmarkFromProfile(formData));
  }
};

export const removeLikedTweetProfile = (data) => async (dispatch) => {
  const response = await fetch(`/api/likes/delete/${data["like_id"]}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const like_id = await response.json();
    dispatch(UnlikeTheTweet(data));
  }
};

export const unfollowAUser = (follow_id) => async (dispatch) => {
  const response = await fetch(`/api/follows/delete/${follow_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const follow = await response.json();
    dispatch(unfollow(follow["follow_id"]));
  }
};

export const removeTweetFromProfile = (tweet_id) => async (dispatch) => {
  const response = await fetch(`/api/tweets/delete/${tweet_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const tweet = await response.json();
    dispatch(removeTheTweet(tweet_id));
  }
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      return action.user;
    case FOLLOW:
      const oldUserData = { ...state };
      const userFollowers = oldUserData["followers"];
      userFollowers.push(action.follow);
      return oldUserData;
    case UNFOLLOW:
      function getFollowObject(object) {
        return object["id"] === action.follow_id;
      }
      let oldUserDataTwo = { ...state };
      let userFollowersTwo = oldUserDataTwo["followers"];
      const index = userFollowersTwo.findIndex(getFollowObject);
      userFollowersTwo.splice(index, 1);
      return oldUserDataTwo;
    case ADDLIKE:
      function getLikeObject(object) {
        return object["id"] === action.like.tweet_id;
      }
      // Phase 1
      const oldUserObject = { ...state };
      const oldUserTweetArray = oldUserObject["tweets"];
      const findTheDex = oldUserTweetArray.findIndex(getLikeObject);
      const theObject = oldUserTweetArray[findTheDex];
      theObject["like_count"]++;
      theObject["like_array"].push(action.like);

      // Phase 2
      const oldUserObject42069 = oldUserObject["likes"];
      oldUserObject42069.push(theObject);

      return oldUserObject;
    case REMOVELIKE:
      function getLikeObject2(object) {
        return object["id"] === action.data.tweet_id;
      }
      function getLikeObject3(object) {
        return object["id"] === action.data.like_id;
      }
      // Phase 1
      const oldUserObject2 = { ...state };
      const oldUserTweetArray2 = oldUserObject2["tweets"];
      const findTheDex2 = oldUserTweetArray2.findIndex(getLikeObject2);
      const theObject2 = oldUserTweetArray2[findTheDex2];
      if (theObject2["like_count"] > 0) theObject2["like_count"]--;
      const findTheDex3 = theObject2["like_array"].findIndex(getLikeObject3);
      theObject2["like_array"].splice(findTheDex3, 1);

      // Phase 2
      const oldUserLikeArray2 = oldUserObject2["likes"];
      const findTheDex69 = oldUserLikeArray2.findIndex(getLikeObject2);
      oldUserLikeArray2.splice(findTheDex69, 1);

      return oldUserObject2;
    case REMOVETWEET:
      function findSpecificTweetObject(object) {
        return object["id"] === action.tweet_id;
      }
      const oldUserObject3 = { ...state };
      const oldUserTweetArray3 = oldUserObject3["tweets"];
      const findTheDex4 = oldUserTweetArray3.findIndex(findSpecificTweetObject);
      oldUserTweetArray3.splice(findTheDex4, 1);
      return oldUserObject3;
    case ADDBOOKMARKPROFILE:
      function getTheUserObj(object) {
        return object["id"] === action.data.tweet_id;
      }
      const oldUserData40 = { ...state };
      const oldUserDataBookmarks40 = oldUserData40["tweets"];
      const theIndex420 = oldUserDataBookmarks40.findIndex(getTheUserObj);
      const oldUserDataBookmarksReal =
        oldUserDataBookmarks40[theIndex420]["bookmark_array"];
      oldUserDataBookmarksReal.push(action.data);
      return oldUserData40;
    case REMOVEBOOKMARKPROFILE:
      function getTheUserObj4(object) {
        return object["id"] === action.data.tweet_id;
      }
      function getTheUserObj40(object) {
        return object["id"] === action.data.bookmark_id;
      }
      const oldUserData400 = { ...state };
      const oldUserDataBookmarks400 = oldUserData400["tweets"];
      const theIndex4200 = oldUserDataBookmarks400.findIndex(getTheUserObj4);
      const oldUserDataBookmarksReal0 =
        oldUserDataBookmarks400[theIndex4200]["bookmark_array"];
      const theIndex000 = oldUserDataBookmarksReal0.findIndex(getTheUserObj40);
      oldUserDataBookmarksReal0.splice(theIndex000, 1);
      return oldUserData400;
    case UPDATETWEET:
      function getTheTweetUpdate(object) {
        return object["id"] === action.tweet.id;
      }
      const updateUserDataObject = { ...state };
      const updateUserDataObjectTweets = updateUserDataObject["tweets"];
      const updateUserDataIndex =
        updateUserDataObjectTweets.findIndex(getTheTweetUpdate);
      updateUserDataObjectTweets[updateUserDataIndex]["tweet"] =
        action.tweet.tweet;
      return updateUserDataObject;
    case UPDATEUSERPRO:
      const theCurrentUser = { ...state };
      theCurrentUser["name"] = action.user.name;
      theCurrentUser["description"] = action.user.description;
      return theCurrentUser;
    default:
      return state;
  }
};

export default userReducer;
