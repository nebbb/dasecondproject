import React from "react";
import "./CommentCard.css";
import { useDispatch } from "react-redux";
import { deleteCommentTweet } from "../../store/tweets";

export default function CommentCard({ comment, user }) {
  const dispatch = useDispatch();
  // function showDropdown(e) {
  //   // (element x - body x) + adjustments
  //   // (element y - body y) + adjustments
  //   const elementRadius = e.currentTarget.getBoundingClientRect();
  //   const boundingVariable = document.querySelector(".tweet-option-dd");
  //   const bodyRect = document.body.getBoundingClientRect();

  //   boundingVariable.style.display = "block";
  //   boundingVariable.style.position = "absolute";
  //   boundingVariable.style.left = `${
  //     elementRadius.left - bodyRect.left - 220
  //   }px`;
  //   boundingVariable.style.top = `${elementRadius.top - bodyRect.top}px`;
  //   return;
  // }

  function removeCommentFun() {
    const data = {
      tweet_id: comment.tweet_id,
      comment_id: comment.id,
      id: comment.id,
    };
    dispatch(deleteCommentTweet(data));
  }

  return (
    <div className="single-tweet-card--comment">
      <div className="single-tweet-comm-left">
        <img
          src={comment?.["user"]["profile_pic"]}
          alt="profile-pic"
          className="single-tweet-comment-pro-pic"
        />
      </div>
      <div className="single-tweet-comm-right">
        <div className="single-tweet-comm-right-top">
          <div>
            <span>{`@${comment?.["user"]["username"]}`}</span>
            <span>.</span>
            <span className="comment-time">{`${comment?.["sent_date"]}`}</span>
          </div>
          {user.id === comment.user_id && (
            <button onClick={removeCommentFun}>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                class="r-9l7dzd r-4qtqp9 r-yyyyoo r-1q142lx r-1xvli5t r-1b7u577 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
              >
                <g>
                  <path d="M20.746 5.236h-3.75V4.25c0-1.24-1.01-2.25-2.25-2.25h-5.5c-1.24 0-2.25 1.01-2.25 2.25v.986h-3.75c-.414 0-.75.336-.75.75s.336.75.75.75h.368l1.583 13.262c.216 1.193 1.31 2.027 2.658 2.027h8.282c1.35 0 2.442-.834 2.664-2.072l1.577-13.217h.368c.414 0 .75-.336.75-.75s-.335-.75-.75-.75zM8.496 4.25c0-.413.337-.75.75-.75h5.5c.413 0 .75.337.75.75v.986h-7V4.25zm8.822 15.48c-.1.55-.664.795-1.18.795H7.854c-.517 0-1.083-.246-1.175-.75L5.126 6.735h13.74L17.32 19.732z"></path>
                  <path d="M10 17.75c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75zm4 0c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75z"></path>
                </g>
              </svg>
            </button>
          )}
        </div>
        <div className="single-tweet-comm-right-bottom">
          <span>{comment?.["comment"]}</span>
        </div>
      </div>
    </div>
  );
}
