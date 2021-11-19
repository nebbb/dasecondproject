import React, { useEffect } from "react";
import "./TweetDetails.css";
import { useHistory } from "react-router-dom";
import SingleTweetCard from "../SingleTweetCard";
import CommentCard from "../CommentCard";

export default function TweetDetails({ tweet, user }) {
  const history = useHistory();

  // function removeModal(e) {
  //   // setTimeout(() => {
  //   if (document.querySelector(".tweet-option-dd"))
  //     if (!e.target.classList.contains("dont-remove")) {
  //       document.querySelector(".tweet-option-dd").style.display = "none";
  //     }
  //   // }, 5000);
  // }

  // useEffect(() => {
  //   document.body.addEventListener("click", removeModal);
  //   return () => document.body.removeEventListener("click", removeModal);
  // }, []);

  return (
    <div className="tweet__details--container">
      {/* <div className="dont-remove tweet-option-dd">
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
      </div> */}
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
        <span>Tweet</span>
      </div>
      <SingleTweetCard tweet={tweet} user={user} />
    </div>
  );
}
