import React from "react";
import "./ProfileSection.css";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { followAUser, unfollowAUser } from "../../store/user";
import TweetCard from "../TweetCard";

export default function ProfileSection({ user, userId, currentUser }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const followObject =
    currentUser?.followers?.find((followObj) => followObj.sender === user.id) ||
    false;

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
        <div className="profile__section--container-top-spit-t">
          <img
            alt="profile-pic"
            className="profile__section--container-top-spit-t-image"
            src={currentUser?.profile_pic}
          />
        </div>
        <div className="profile__section--container-top-spit-b">
          <div className="profile__section--container-top-spit-b--wrapper">
            <h3 className="user-profile--name">{currentUser?.username}</h3>
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
              <span className="user-profile--joined">{`Joined ${currentUser?.created_at}`}</span>
            </div>
            <div className="user-profile-stats">
              <span>{currentUser?.following?.length} Following</span>
              <span>{currentUser?.followers?.length} Followers</span>
            </div>

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
          <div className="user-profile-menu">
            <div>
              <span>Tweets</span>
            </div>
            <div>
              <span>Likes</span>
            </div>
          </div>
        </div>
      </div>
      <div className="profile__section--container-top">
        {currentUser?.tweets &&
          currentUser?.tweets.map((tweet) => (
            <TweetCard tweet={tweet} user={user} profile={true} />
          ))}
      </div>
    </div>
  );
}
