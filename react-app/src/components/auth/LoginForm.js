import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form
      onSubmit={onLogin}
      className="login-main__container"
      autoComplete="off"
    >
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        {/* <label htmlFor="email">Email</label> */}
        <input
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          className="login-input__e"
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        {/* <label htmlFor="password">Password</label> */}
        <input
          className="login-input__p"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <button type="submit" className="login-btn__l">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
