import React, { useState, useEffect } from "react";
import TweetCard from "../TweetCard";
import "./HomeTweets.css";
import { addTweet } from "../../store/tweets";
import { useDispatch } from "react-redux";

export default function HomeTweets({ tweets, user }) {
  const dispatch = useDispatch();
  const [tweetInput, setTweetInput] = useState("");
  const [tweetImage, setTweetImage] = useState(null);
  function removeModal(e) {
    if (!e.target.classList.contains("dont-remove")) {
      document.querySelector(".tweet-option-dd").style.display = "none";
    }
  }

  useEffect(() => {
    document.body.addEventListener("click", removeModal);
    return function cleanup() {
      document.body.removeEventListener("click", removeModal);
    };
  }, []);

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
      <div className="dont-remove tweet-option-dd">
        <div className="dont-remove">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            width="22px"
            height="22px"
            className="dont-remove kansd-00 adsad-0 r-9l7dzd r-4qtqp9 r-yyyyoo r-1q142lx r-1xvli5t r-1b7u577 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
          >
            <g>
              <path d="M20.746 5.236h-3.75V4.25c0-1.24-1.01-2.25-2.25-2.25h-5.5c-1.24 0-2.25 1.01-2.25 2.25v.986h-3.75c-.414 0-.75.336-.75.75s.336.75.75.75h.368l1.583 13.262c.216 1.193 1.31 2.027 2.658 2.027h8.282c1.35 0 2.442-.834 2.664-2.072l1.577-13.217h.368c.414 0 .75-.336.75-.75s-.335-.75-.75-.75zM8.496 4.25c0-.413.337-.75.75-.75h5.5c.413 0 .75.337.75.75v.986h-7V4.25zm8.822 15.48c-.1.55-.664.795-1.18.795H7.854c-.517 0-1.083-.246-1.175-.75L5.126 6.735h13.74L17.32 19.732z"></path>
              <path d="M10 17.75c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75zm4 0c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75z"></path>
            </g>
          </svg>
          Delete
        </div>
        <div className="dont-remove">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            width="22px"
            height="22px"
            className="dont-remove adsad-0 r-111h2gw r-4qtqp9 r-yyyyoo r-1q142lx r-1xvli5t r-1b7u577 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
          >
            <g>
              <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
            </g>
          </svg>
          Edit
        </div>
      </div>
      <div className="home__tweets--home">
        <span>Home</span>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          class="ansda-2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
        >
          <g>
            <path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path>
          </g>
        </svg>
      </div>
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
