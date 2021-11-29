import React, { useState } from "react";
import "./ChannelSection.css";
import ChannelCard from "./ChannelCard";

export default function ChannelSection({
  channels,
  user,
  setSelectedChannel,
  setModal,
}) {
  // const [modal, setModal] = useState(false);
  // function closeFindModal() {
  //   const modal = document.querySelector(".tweet__card--delete__container-2");
  //   modal.style.display = "none";
  // }

  return (
    <div className="channel__section--container">
      <div className="home__tweets--home home__tweets--home--tweet home__tweets--home--tweet-4">
        <span>Messages</span>
        <button onClick={() => setModal(true)}>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="asaska-1 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
          >
            <g>
              <path d="M23.25 3.25h-2.425V.825c0-.414-.336-.75-.75-.75s-.75.336-.75.75V3.25H16.9c-.414 0-.75.336-.75.75s.336.75.75.75h2.425v2.425c0 .414.336.75.75.75s.75-.336.75-.75V4.75h2.425c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zm-3.175 6.876c-.414 0-.75.336-.75.75v8.078c0 .414-.337.75-.75.75H4.095c-.412 0-.75-.336-.75-.75V8.298l6.778 4.518c.368.246.79.37 1.213.37.422 0 .844-.124 1.212-.37l4.53-3.013c.336-.223.428-.676.204-1.012-.223-.332-.675-.425-1.012-.2l-4.53 3.014c-.246.162-.563.163-.808 0l-7.586-5.06V5.5c0-.414.337-.75.75-.75h9.094c.414 0 .75-.336.75-.75s-.336-.75-.75-.75H4.096c-1.24 0-2.25 1.01-2.25 2.25v13.455c0 1.24 1.01 2.25 2.25 2.25h14.48c1.24 0 2.25-1.01 2.25-2.25v-8.078c0-.415-.337-.75-.75-.75z"></path>
            </g>
          </svg>
        </button>
      </div>

      <div>
        {channels.map((channel) => (
          <ChannelCard
            channel={channel}
            user={user}
            setSelectedChannel={setSelectedChannel}
            key={channel?.id}
          />
        ))}
      </div>
    </div>
  );
}
