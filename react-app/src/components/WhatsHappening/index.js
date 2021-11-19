import React from "react";
import "./WhatsHappening.css";

export default function WhatsHappening() {
  return (
    <div className="whats__happening--container">
      <h3>What's happening</h3>
      <div className="whats__happening--card">
        <div className="whats__happening--card-left">
          <span className="whats__happening--header">Space . 2 hours ago</span>
          <p>
            The longest partial lunar eclipse in over 500 years occured this
            year
          </p>
          <span>
            Trending with <a>Space</a>
          </span>
        </div>
        <div className="whats__happening--card-right">
          <img
            alt="news-img"
            src="https://pbs.twimg.com/semantic_core_img/1461299053539389444/unb2ft8r?format=jpg&name=120x120"
          />
        </div>
      </div>
      <div className="whats__happening--card">
        <div className="whats__happening--card-left">
          <span className="whats__happening--header">
            Television . Trending
          </span>
          <p>#ONEPIECE1032</p>
          <span>9,132 Tweets</span>
        </div>
        <div className="whats__happening--card-right"></div>
      </div>
      <div className="whats__happening--card">
        <div className="whats__happening--card-left">
          <span className="whats__happening--header">Music . LIVE</span>
          <p>Adele releases new album 30</p>
          <span>
            Trending with <a>Space, My Little Love</a>
          </span>
        </div>
        <div className="whats__happening--card-right">
          <img
            alt="news-img"
            src="https://pbs.twimg.com/semantic_core_img/1455630824804474888/un-6JoRQ?format=jpg&name=240x240"
          />
        </div>
      </div>
    </div>
  );
}
