import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, name));
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind} className="error-map">
            {error}
          </div>
        ))}
      </div>
      <div>
        {/* <label>User Name</label> */}
        <input
          type="text"
          placeholder="Username"
          className="login-input__e"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        {/* <label>User Name</label> */}
        <input
          type="text"
          placeholder="Full Name"
          className="login-input__e"
          name="name"
          onChange={updateName}
          value={name}
        ></input>
      </div>
      <div>
        {/* <label>Email</label> */}
        <input
          type="text"
          placeholder="Email"
          className="login-input__e"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        {/* <label>Password</label> */}
        <input
          type="password"
          placeholder="Password"
          className="login-input__e"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        {/* <label>Repeat Password</label> */}
        <input
          type="password"
          placeholder="Confirm Password"
          className="login-input__e"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type="submit" className="login-btn__l">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
