import React, { useState } from "react";
import TweetCard from "../TweetCard";
import "./HomeTweets.css";
import { addTweet } from "../../store/tweets";
import { useDispatch } from "react-redux";

export default function HomeTweets({ tweets, user }) {
  const dispatch = useDispatch();
  const [tweetInput, setTweetInput] = useState("");
  const [tweetImage, setTweetImage] = useState(null);

  function uploadTweet() {
    const tweet = {
      user_id: user.id,
      tweet: tweetInput,
      image: tweetImage,
    };
    dispatch(addTweet(tweet));
    setTweetInput("");
    setTweetImage(null);
  }

  return (
    <div className="home__tweets--container">
      <div className="home__tweets--create">
        <div className="home__tweets--left">
          <div className="home__tweet--profile">
            <img
              src={user["profile_pic"]}
              alt="profile-pic"
              className="home__tweet--profile-pic"
            />
          </div>
        </div>
        <div className="home__tweets--right">
          <div className="home__tweets--right--top">
            <input
              className="home__tweet--create--input"
              placeholder="What's happening?"
              autoComplete="off"
              onChange={(e) => setTweetInput(e.target.value)}
              spellcheck="false"
              value={tweetInput}
            />
          </div>
          <div className="home__tweets--right--bottom">
            <div className="home__tweet--buttons">
              <div className="home__tweet__btn--svg">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
                >
                  <g>
                    <path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"></path>
                    <circle cx="8.868" cy="8.309" r="1.542"></circle>
                  </g>
                </svg>
              </div>
              <div className="home__tweet__btn--svg">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="r-1cvl2hr r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
                >
                  <g>
                    <path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"></path>
                    <path d="M12 17.115c-1.892 0-3.633-.95-4.656-2.544-.224-.348-.123-.81.226-1.035.348-.226.812-.124 1.036.226.747 1.162 2.016 1.855 3.395 1.855s2.648-.693 3.396-1.854c.224-.35.688-.45 1.036-.225.35.224.45.688.226 1.036-1.025 1.594-2.766 2.545-4.658 2.545z"></path>
                    <circle cx="14.738" cy="9.458" r="1.478"></circle>
                    <circle cx="9.262" cy="9.458" r="1.478"></circle>
                  </g>
                </svg>
              </div>
            </div>

            {tweetInput.length <= 0 ? (
              <button className="home__create--btn">Tweet</button>
            ) : (
              <button
                className="home__create--btn--active"
                onClick={uploadTweet}
              >
                Tweet
              </button>
            )}
          </div>
        </div>
      </div>
      {tweets && tweets.map((tweet) => <TweetCard tweet={tweet} user={user} />)}
    </div>
  );
}
