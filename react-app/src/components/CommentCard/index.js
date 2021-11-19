import React from "react";
import "./CommentCard.css";

export default function CommentCard({ comment, user }) {
  function showDropdown(e) {
    // (element x - body x) + adjustments
    // (element y - body y) + adjustments
    const elementRadius = e.currentTarget.getBoundingClientRect();
    const boundingVariable = document.querySelector(".tweet-option-dd");
    const bodyRect = document.body.getBoundingClientRect();

    boundingVariable.style.display = "block";
    boundingVariable.style.position = "absolute";
    boundingVariable.style.left = `${
      elementRadius.left - bodyRect.left - 220
    }px`;
    boundingVariable.style.top = `${elementRadius.top - bodyRect.top}px`;
    return;
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
            <button onClick={showDropdown} className="dont-remove">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                class="dont-remove r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
              >
                <g>
                  <circle cx="5" cy="12" r="2"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                  <circle cx="19" cy="12" r="2"></circle>
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
