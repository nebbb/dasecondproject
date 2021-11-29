import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import { login } from "../../store/session";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  function demoLogin() {
    dispatch(login("demo@aa.io", "password")).then(() => history.push("/"));
  }

  return (
    <div className="login__page-container">
      {loginModal && (
        <div className="login-page__login-modal">
          <div className="login-page__login-inner">
            <button
              className="close__container-modal"
              onClick={() => setLoginModal(false)}
            >
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
            <div className="login--main-inner-s">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                class="b-2aaasab r-jwli3a r-4qtqp9 r-yyyyoo r-rxcuwo r-1777fci r-m327ed r-dnmrzs r-494qqr r-bnwqim r-1plcrui r-lrvibr"
              >
                <g>
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                </g>
              </svg>
              <h3>Sign in to Twitta</h3>
            </div>

            <LoginForm />
            <div className="non-login-inner">
              <div className="span-container__login">
                <span className="span-login-1">Don't have an account?</span>
                <span className="span-login-2">Sign up</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {signupModal && (
        <div className="login-page__login-modal">
          <div className="login-page__login-inner">
            <button
              className="close__container-modal"
              onClick={() => setSignupModal(false)}
            >
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
            <div className="login--main-inner-s login--main-inner-u">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                class="nasin-pp b-2aaasab r-jwli3a r-4qtqp9 r-yyyyoo r-rxcuwo r-1777fci r-m327ed r-dnmrzs r-494qqr r-bnwqim r-1plcrui r-lrvibr"
              >
                <g>
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                </g>
              </svg>
              <h3>Create your account</h3>
            </div>

            <SignUpForm />
            <div className="non-login-inner">
              <div className="span-container__login span-container__login-u">
                <span className="span-login-1">Already have an account?</span>
                <span className="span-login-2">Sign in</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="login--left-side">
        <div>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="p-243asa r-jwli3a r-4qtqp9 r-yyyyoo r-rxcuwo r-1777fci r-m327ed r-dnmrzs r-494qqr r-bnwqim r-1plcrui r-lrvibr"
          >
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>
        </div>
      </div>
      <div className="login--right-side">
        <div>
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="p-243asab r-jwli3a r-4qtqp9 r-yyyyoo r-rxcuwo r-1777fci r-m327ed r-dnmrzs r-494qqr r-bnwqim r-1plcrui r-lrvibr"
          >
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>
        </div>
        <h2>Happening now</h2>
        <h3>Join Twitta today.</h3>
        <div className="login-wrapper">
          <button className="login-btn-demo" onClick={demoLogin}>
            Demo
          </button>
          <div className="or-line-holder">
            <div className="just-line"></div>
            <h4>or</h4>
            <div className="just-line"></div>
          </div>
          <button
            className="login-btn-sign-up"
            onClick={() => setSignupModal(true)}
          >
            Sign up
          </button>
          <span>
            By signing up, you agree to the Terms of Service and Privacy Policy,
            including Cookie Use.
          </span>
          <div>
            <p>Already have an account?</p>
            <button
              className="login-btn-sign-in"
              onClick={() => setLoginModal(true)}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
      <div className="login__page-footer">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="28"
            height="28"
            viewBox="0 0 48 48"
          >
            <path
              fill="#455A64"
              d="M40.3,15.7c0.6-1.7,1.2-5-0.4-8.7c-4.5,0-8.3,3.2-8.9,3.8c-2.2-0.5-4.6-0.7-7-0.7c-2.5,0-4.9,0.3-7.2,0.8C13.7,7.7,9.6,7,8,7c0,0-0.9,1.8-0.9,5c0,2,0.5,3.2,0.8,3.8C5.5,18.3,4,21.7,4,26.1c0,11.2,7.1,15,20,15s20-3.8,20-15C44,21.5,42.6,18.1,40.3,15.7z"
            ></path>
            <path
              fill="#FFCCBC"
              d="M24,39c-8.2,0-15-1.4-15-9c0-2.9,1.6-4.5,2.7-5.5c2.5-2.2,6.7-1.2,12.3-1.2c4.1,0,7.6-0.7,10.4,0.2c2.8,0.9,4.6,3.5,4.6,6.3C39,37.7,35,39,24,39z"
            ></path>
            <path
              fill="#D84315"
              d="M25,34c0,0.6-0.4,1-1,1s-1-0.4-1-1s0.4-1,1-1S25,33.4,25,34z M26.5,36.5c0.2-0.2,0.2-0.5,0-0.7s-0.5-0.2-0.7,0c-0.9,0.9-2.6,0.9-3.5,0c-0.2-0.2-0.5-0.2-0.7,0s-0.2,0.5,0,0.7c0.7,0.7,1.5,1,2.5,1S25.8,37.1,26.5,36.5z"
            ></path>
            <path
              fill="#FFF"
              d="M19,29.5c0,2.5-1.3,4.5-3,4.5s-3-2-3-4.5s1.3-4.5,3-4.5S19,27,19,29.5z M32,25c-1.7,0-3,2-3,4.5s1.3,4.5,3,4.5c1.7,0,3-2,3-4.5S33.7,25,32,25z"
            ></path>
            <path
              fill="#6D4C41"
              d="M34,30c0,1.7-0.9,3-2,3s-2-1.3-2-3c0-0.2,0-0.5,0.1-0.7c0.1,0.4,0.5,0.7,0.9,0.7c0.6,0,1-0.4,1-1c0-0.6-0.4-1-1-1c-0.2,0-0.4,0.1-0.6,0.2c0.4-0.7,0.9-1.2,1.6-1.2C33.1,27,34,28.3,34,30z M16,27c-0.7,0-1.2,0.5-1.6,1.2c0.2-0.1,0.4-0.2,0.6-0.2c0.6,0,1,0.4,1,1c0,0.6-0.4,1-1,1c-0.4,0-0.8-0.3-0.9-0.7c0,0.2-0.1,0.5-0.1,0.7c0,1.7,0.9,3,2,3s2-1.3,2-3S17.1,27,16,27z"
            ></path>
          </svg>
          <a href="https://github.com/nebbb">Github</a>
        </span>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="28"
            height="28"
            viewBox="0 0 48 48"
          >
            <path
              fill="#0288D1"
              d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
            ></path>
            <path
              fill="#FFF"
              d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"
            ></path>
          </svg>
          <a href="https://github.com/nebbb">LinkedIn</a>
        </span>
        <span>Terms of Service</span>
        <span>Privacy Policy</span>
        <span>© 2021 Twitta, Inc.</span>
      </div>
    </div>
  );
}
