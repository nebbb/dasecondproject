import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import "./MessageSection.css";
import { io } from "socket.io-client";
import { loadTheMessages, postAMessage } from "../../store/messages";
import Picker from "emoji-picker-react";
let socket;

export default function MessageSection({ channel, user, setModal }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [emojiBtn, setEmojiBtn] = useState(false);
  const messages = useSelector((state) => Object.values(state.messages));
  const [messageInput, setMessageInput] = useState("");
  const otherUser = channel?.user_id.id === user.id ? "user_id2" : "user_id";
  const [prevRoom, setPrevRoom] = useState(channel?.id);
  const [liveMessages, setLiveMessages] = useState([]);

  const onEmojiClick = (event, emojiObject) => {
    setMessageInput((oldText) => (oldText += emojiObject.emoji));
  };

  useEffect(() => {
    dispatch(loadTheMessages({ channel_id: channel?.id }));
  }, [channel, dispatch]);

  function scrollToBottom() {
    const scrollable = document.querySelector(".message__section--wrapper");
    scrollable.scrollTop = scrollable.scrollHeight;
  }

  useEffect(() => {
    socket = io();
    socket.on("message", (chat) => {
      setLiveMessages((liveMessages) => [...liveMessages, chat]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    leaveRoom(prevRoom);
    joinRoom(channel?.id);
    setLiveMessages([]);
    setPrevRoom(channel?.id);
  }, [channel]);

  const leaveRoom = (oldRoom) => {
    socket.emit("leave", { room: oldRoom });
  };

  const joinRoom = (newRoom) => {
    socket.emit("join", { room: newRoom });
  };

  const sendChat = () => {
    if (messageInput.length > 0) {
      socket.send({
        message: messageInput,
        sender: user,
        room: channel.id,
      });
      setMessageInput("");
      return postMessageFun();
    }
  };

  function postMessageFun() {
    const data = {
      sender: user.id,
      reciever: channel[otherUser].id,
      dm_channel_id: channel.id,
      message: messageInput,
    };
    dispatch(postAMessage(data));
    setMessageInput("");
    setEmojiBtn(false);
    // :(
    setTimeout(() => {
      scrollToBottom();
    }, 200);
  }

  if (!channel) {
    return (
      <div className="message__section--container">
        <div className="message__section--alert">
          <h3 className="message__section--alert-h">
            You don’t have a<br />
            message selected
          </h3>
          <span className="message__section--alert-s">
            Choose one from your existing messages, or start a new one.
          </span>
          <button onClick={() => setModal(true)}>New message</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="message__section--container">
        <div className="home__tweets--home home__tweets--home--tweet message-box-name">
          <span className="message-n-1">{channel[otherUser]?.name}</span>
          <span className="message-n-2">{`@${channel[otherUser]?.username}`}</span>
        </div>
        <div className="message__section--wrapper">
          {messages.map((message) => {
            if (message.sender.id !== channel[otherUser]?.id) {
              return (
                <div className="message--container move-to-right">
                  <span>{message.message}</span>
                </div>
              );
            } else {
              return (
                <div className="message--container message--container--left">
                  <img
                    src={message.sender.profile_pic}
                    alt="profile-pic"
                    onClick={() =>
                      history.push(`/profile/${message.sender.id}`)
                    }
                  />
                  <span>{message.message}</span>
                </div>
              );
            }
          })}
          {liveMessages.map((message) => {
            if (message.sender.id !== channel[otherUser]?.id) {
              return (
                <div
                  className={`message--container move-to-right d-${message.sender.id}`}
                >
                  <span>{message.message}</span>
                </div>
              );
            } else {
              return (
                <div
                  className={`message--container message--container--left d-${message.sender.id}`}
                >
                  <img
                    src={message.sender.profile_pic}
                    alt="profile-pic"
                    onClick={() =>
                      history.push(`/profile/${message.sender.id}`)
                    }
                  />
                  <span>{message.message}</span>
                </div>
              );
            }
          })}
        </div>
        <div className="message__section--send">
          <button
            className="message-emoji-btn"
            onClick={() => setEmojiBtn(!emojiBtn)}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="asdpp-1 r-4qtqp9 r-yyyyoo r-1hjwoze r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-12ym1je"
            >
              <g>
                <path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"></path>
                <path d="M12 17.115c-1.892 0-3.633-.95-4.656-2.544-.224-.348-.123-.81.226-1.035.348-.226.812-.124 1.036.226.747 1.162 2.016 1.855 3.395 1.855s2.648-.693 3.396-1.854c.224-.35.688-.45 1.036-.225.35.224.45.688.226 1.036-1.025 1.594-2.766 2.545-4.658 2.545z"></path>
                <circle cx="14.738" cy="9.458" r="1.478"></circle>
                <circle cx="9.262" cy="9.458" r="1.478"></circle>
              </g>
            </svg>
          </button>
          {emojiBtn && (
            <Picker
              onEmojiClick={onEmojiClick}
              pickerStyle={{
                position: "absolute",
                bottom: "130%",
                left: "3%",
                boxShadow: "none",
                color: "rgb(0,0,0)",
              }}
            />
          )}
          <input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Start a new message"
          />
          <button className="message__section-send-btn" onClick={sendChat}>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="asdpp-1 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
            >
              <g>
                <path d="M21.13 11.358L3.614 2.108c-.29-.152-.64-.102-.873.126-.23.226-.293.577-.15.868l4.362 8.92-4.362 8.92c-.143.292-.08.643.15.868.145.14.333.212.523.212.12 0 .24-.028.35-.087l17.517-9.25c.245-.13.4-.386.4-.664s-.155-.532-.4-.662zM4.948 4.51l12.804 6.762H8.255l-3.307-6.76zm3.307 8.26h9.498L4.948 19.535l3.307-6.763z"></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    );
  }
}
