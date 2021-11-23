import React, { useState } from "react";
import { updateProfile } from "../../store/user";
import "./SettingSection.css";
import { useDispatch } from "react-redux";

export default function SettingSection({ name, description, user }) {
  const dispatch = useDispatch();
  const [inputName, setInputName] = useState(name);
  const [inputDescription, inputSetDescription] = useState(description);

  function updateTheProfile() {
    const data = {
      id: user.id,
      name: inputName,
      description: inputDescription,
    };
    dispatch(updateProfile(data));
  }

  return (
    <div className="setting__section--container">
      <div className="home__tweets--home">
        <span>Settings</span>
      </div>
      <div className="setting__section--setting">
        <div>
          <span>Name</span>
          <input
            autoComplete="off"
            spellcheck="false"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
        </div>
        <div>
          <span>Description</span>
          <textarea
            autoComplete="off"
            spellcheck="false"
            value={inputDescription}
            onChange={(e) => inputSetDescription(e.target.value)}
          />
        </div>
        <button onClick={updateTheProfile}>Confirm</button>
      </div>
    </div>
  );
}
