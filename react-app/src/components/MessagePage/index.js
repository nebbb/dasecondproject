import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftSideBar from "../LeftSideBar";
import { loadTheChannels, postAChannel } from "../../store/channels";
import "./MessagePage.css";
import MessageSection from "../MessageSection";
import ChannelSection from "../ChannelSection";
import { loadTheFinds } from "../../store/finds";

export default function MessagePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const channels = useSelector((state) => Object.values(state.channels));
  const finds = useSelector((state) => Object.values(state.finds));
  const channelsStateObject = useSelector((state) => state.channels);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(loadTheChannels({ user_id: user.id })).then(() =>
      dispatch(loadTheFinds({ user_id: user.id }))
    );
  }, []);

  async function makeAChannel(id) {
    const data = {
      user_id: user.id,
      user_id2: id,
    };
    const channel = await dispatch(postAChannel(data));
    const finds = await dispatch(loadTheFinds({ user_id: user.id }));
    setModal(false);
    setSelectedChannel(channel);
    // setSelectedChannel(
    //   channelsStateObject[
    //     Object.keys(channelsStateObject)[
    //       Object.keys(channelsStateObject).length - 1
    //     ]
    //   ]
    // );
  }

  return (
    <div className="message__page--container">
      {modal && (
        <div className="tweet__card--delete__container tweet__card--delete__container-2">
          <div className="tweet__card--delete--modal tweet__card--delete--modal-2">
            <header>
              <button onClick={() => setModal(false)}>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="asaska-1 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
                >
                  <g>
                    <path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path>
                  </g>
                </svg>
              </button>
              <span>New message</span>
            </header>
            <div>
              {finds && finds.length === 0 && (
                <div className="follow-user-auth">
                  <img src="https://cdn-icons-png.flaticon.com/512/742/742752.png"></img>
                  <h3>Follow a user to start a new message!</h3>
                </div>
              )}
              {finds &&
                finds.map((user) => (
                  <div
                    className="single-channel-find"
                    onClick={() => makeAChannel(user["user"].id)}
                  >
                    <div className="single-channel-find--left">
                      <img alt="profile-pic" src={user["user"].profile_pic} />
                    </div>
                    <div className="single-channel-find--right">
                      <span className="single-channel-find--right1">
                        {user["user"].name}
                      </span>
                      <span className="single-channel-find--right2">
                        {`@${user["user"].username}`}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      <LeftSideBar user={user} />
      <ChannelSection
        channels={channels}
        user={user}
        setSelectedChannel={setSelectedChannel}
        setModal={setModal}
      />
      <MessageSection
        channel={selectedChannel}
        user={user}
        setModal={setModal}
      />
    </div>
  );
}
