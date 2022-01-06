import React, { useState, useEffect } from "react";
import "./ProfileSection.css";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { followAUser, unfollowAUser } from "../../store/user";
import TweetCard from "../TweetCard";

export default function ProfileSection({ user, userId, currentUser }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [pageSection, setPageSection] = useState("tweets");
  const followObject =
    currentUser?.followers?.find((followObj) => followObj.sender === user.id) ||
    false;
  const [selectedTweet, setSelectedTweet] = useState(null);

  function removeModal(e) {
    // setTimeout(() => {
    if (document.querySelector(".tweet-option-dd"))
      if (!e.target.classList.contains("dont-remove")) {
        document.querySelector(".tweet-option-dd").style.display = "none";
      }
    // }, 5000);
  }

  useEffect(() => {
    if (pageSection === "tweets") {
      document.querySelector(
        ".user-profile-menu .user-tweets-line"
      ).style.display = "block";
      document.querySelector(
        ".user-profile-menu .user-likes-line"
      ).style.display = "none";
    } else {
      document.querySelector(
        ".user-profile-menu .user-tweets-line"
      ).style.display = "none";
      document.querySelector(
        ".user-profile-menu .user-likes-line"
      ).style.display = "block";
    }
  }, [pageSection]);

  useEffect(() => {
    document.body.addEventListener("click", removeModal);
    return () => document.body.removeEventListener("click", removeModal);
  }, []);

  function followAUserFun() {
    const data = {
      sender: user.id,
      reciever: +userId,
    };
    dispatch(followAUser(data));
  }

  function unFollowAUserFun() {
    dispatch(unfollowAUser(followObject.id));
  }
  function redirectToSettings() {
    return history.push("/account");
  }

  return (
    <div className="profile__section--container">
      <div className="dont-remove tweet-option-dd">
        <div
          className="dont-remove"
          onClick={() =>
            (document.querySelector(
              `.tweet__card--delete__container-${selectedTweet}`
            ).style.display = "block")
          }
        >
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
        <div
          className="dont-remove"
          onClick={() =>
            (document.querySelector(
              `.tweet__card--edit__container-${selectedTweet}`
            ).style.display = "block")
          }
        >
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
      <div className="home__tweets--home home__tweets--home--tweet">
        <button onClick={() => history.goBack()}>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="asdsa-p r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
          >
            <g>
              <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
            </g>
          </svg>
        </button>
        <span>{currentUser?.username}</span>
      </div>
      <div className="profile__section--container-top">
        <div
          className="profile__section--container-top-spit-t"
          style={
            currentUser?.banner_pic?.length
              ? {
                  backgroundImage: `url(${currentUser?.banner_pic})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }
              : {}
          }
        >
          <img
            alt="profile-pic"
            className="profile__section--container-top-spit-t-image"
            src={currentUser?.profile_pic}
          />
        </div>
        <div className="profile__section--container-top-spit-b">
          <div className="profile__section--container-top-spit-b--wrapper">
            <h3 className="user-profile--name">{currentUser?.name}</h3>
            <h4 className="user-profile--username">{`@${currentUser?.username}`}</h4>
            <span className="user-profile--description">
              {currentUser?.description}
            </span>
            <div className="user-profile-joined--div">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                class="r-111h2gw r-4qtqp9 r-yyyyoo r-1xvli5t r-1d4mawv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
              >
                <g>
                  <path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"></path>
                  <circle cx="7.032" cy="8.75" r="1.285"></circle>
                  <circle cx="7.032" cy="13.156" r="1.285"></circle>
                  <circle cx="16.968" cy="8.75" r="1.285"></circle>
                  <circle cx="16.968" cy="13.156" r="1.285"></circle>
                  <circle cx="12" cy="8.75" r="1.285"></circle>
                  <circle cx="12" cy="13.156" r="1.285"></circle>
                  <circle cx="7.032" cy="17.486" r="1.285"></circle>
                  <circle cx="12" cy="17.486" r="1.285"></circle>
                </g>
              </svg>
              <span className="user-profile--joined">{`Joined ${currentUser?.created_at
                ?.split(" ")
                .slice(0, 4)
                .join(" ")}`}</span>
            </div>
            <div className="user-profile-stats">
              <span>{currentUser?.following?.length} Following</span>
              <span>{currentUser?.followers?.length} Followers</span>
            </div>
            <div className="button-holders">
              {currentUser.id !== user.id && (
                <button
                  className="user-profile--message-btn"
                  onClick={() => history.push("/messages")}
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
                  >
                    <g>
                      <path d="M19.25 3.018H4.75C3.233 3.018 2 4.252 2 5.77v12.495c0 1.518 1.233 2.753 2.75 2.753h14.5c1.517 0 2.75-1.235 2.75-2.753V5.77c0-1.518-1.233-2.752-2.75-2.752zm-14.5 1.5h14.5c.69 0 1.25.56 1.25 1.25v.714l-8.05 5.367c-.273.18-.626.182-.9-.002L3.5 6.482v-.714c0-.69.56-1.25 1.25-1.25zm14.5 14.998H4.75c-.69 0-1.25-.56-1.25-1.25V8.24l7.24 4.83c.383.256.822.384 1.26.384.44 0 .877-.128 1.26-.383l7.24-4.83v10.022c0 .69-.56 1.25-1.25 1.25z"></path>
                    </g>
                  </svg>
                </button>
              )}

              {user.id === +userId ? (
                <button
                  className="user-profile--edit-btn"
                  onClick={redirectToSettings}
                >
                  Edit profile
                </button>
              ) : currentUser?.followers?.find(
                  (followObj) => followObj.sender === user.id
                ) ? (
                <button
                  className="user-profile--edit-following"
                  onClick={unFollowAUserFun}
                >
                  Following
                </button>
              ) : (
                <button
                  className="user-profile--edit-del"
                  onClick={followAUserFun}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
          <div className="user-profile-menu">
            <div
              onClick={() => setPageSection("tweets")}
              className="user-tweets-container"
            >
              <span>Tweets</span>
              <div className="user-tweets-line"></div>
            </div>
            <div
              onClick={() => setPageSection("likes")}
              className="user-tweets-container"
            >
              <span>Likes</span>
              <div className="user-likes-line"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile__section--container-top">
        {pageSection === "tweets" &&
          currentUser?.tweets &&
          currentUser?.tweets.map((tweet) => (
            <TweetCard
              tweet={tweet}
              user={user}
              profile={true}
              setSelectedTweet={setSelectedTweet}
              key={tweet?.id}
            />
          ))}
        {pageSection === "likes" &&
          currentUser?.likes &&
          currentUser?.likes.map((tweet) => (
            <TweetCard
              tweet={tweet}
              user={user}
              likesPage={true}
              setSelectedTweet={setSelectedTweet}
              key={tweet?.id}
            />
          ))}
      </div>
    </div>
  );
}
