import React, { useState } from "react";
import "./SingleTweetCard.css";
import CommentCard from "../CommentCard";
import { addAComment } from "../../store/tweets";
import { useDispatch } from "react-redux";
import { likeATweet, removeLikedTweet } from "../../store/tweets";

export default function SingleTweetCard({ tweet, user }) {
  const dispatch = useDispatch();
  const [replyInput, setReplyInput] = useState("");
  const tweetUserLike =
    tweet?.like_array.find((like_obj) => like_obj["user_id"] === user["id"]) ||
    false;

  function replyTweetFun() {
    const data = {
      user_id: user.id,
      tweet_id: tweet.id,
      comment: replyInput,
    };
    dispatch(addAComment(data));
    setReplyInput("");
  }

  function likeATweetFun() {
    const data = {
      user_id: user["id"],
      tweet_id: tweet["id"],
    };
    dispatch(likeATweet(data));
  }

  function removeATweetFun() {
    const data = {
      tweet_id: tweet.id,
      like_id: tweetUserLike.id,
    };
    dispatch(removeLikedTweet(data));
  }

  return (
    <div className="single-tweet-card--container">
      <div className="padding-wrapper-single--tweet">
        <div className="single-tweet-card--top">
          <div className="single-tweet-user-details">
            <div className="single-tweet-user-left">
              <img
                className="single-tweet-user-left-pic"
                src={tweet?.user.profile_pic}
                alt="user-pic"
              />
            </div>
            <div className="single-tweet-user-right">
              <div className="single-tweet-user-right-top">
                <span>{`@${tweet?.user.username}`}</span>
              </div>
              <div className="single-tweet-user-right-bottom"></div>
            </div>
          </div>
          <div className="single-tweet-user-tweet-content">
            <p>{tweet?.tweet}</p>
            {tweet?.image && (
              <img
                className="single-tweet-pic"
                src={tweet?.image}
                alt="tweet-img"
              />
            )}
            <span>{tweet?.sent_date}</span>
          </div>
          <div className="single-tweet-user-tweet-stats">
            <span>{`${tweet?.like_count}`}</span>
            {tweet?.like_count === 1 ? <p>Like</p> : <p>Likes</p>}
            <span>{`${tweet?.comment_count}`}</span>
            {tweet?.comment_count === 1 ? <p>Comment</p> : <p>Comments</p>}
          </div>
          <div className="single-tweet-user-tweet-btns">
            <div>
              <button>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="r-4qtqp9 r-yyyyoo r-50lct3 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1srniue"
                >
                  <g>
                    <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                  </g>
                </svg>
              </button>
            </div>
            <div>
              {tweet?.like_array.find(
                (like_obj) => like_obj["user_id"] === user["id"]
              ) ? (
                <button onClick={removeATweetFun}>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="r-4qtqp9 r-4qtqp09 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
                  >
                    <g>
                      <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"></path>
                    </g>
                  </svg>
                </button>
              ) : (
                <button onClick={likeATweetFun}>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
                  >
                    <g>
                      <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
                    </g>
                  </svg>
                </button>
              )}
            </div>
            <div>
              <button>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="r-4qtqp9 r-yyyyoo r-50lct3 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1srniue"
                >
                  <g>
                    <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path>
                    <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="single-tweet-card--bottom">
          <div className="single-tweet-card--bottom-reply">
            <img
              src={user?.profile_pic}
              alt="user-pic"
              className="single-tweet-profile-pic-reply"
            />
            <input
              spellCheck="false"
              autoComplete="off"
              placeholder="Tweet your reply"
              onChange={(e) => setReplyInput(e.target.value)}
              value={replyInput}
            />
            {replyInput.length <= 0 ? (
              <button className="reply-tweet-unactive">Reply</button>
            ) : (
              <button className="reply-tweet-active" onClick={replyTweetFun}>
                Reply
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="single-tweet-card--bottom--comments">
        {tweet?.["comment_array"]?.length > 0 &&
          tweet?.["comment_array"]
            .reverse()
            .map((comment) => <CommentCard comment={comment} user={user} />)}
      </div>
    </div>
  );
}
