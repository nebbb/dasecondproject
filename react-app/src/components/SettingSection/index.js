import React, { useState } from "react";
import { updateProfile } from "../../store/user";
import "./SettingSection.css";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";

export default function SettingSection({ name, description, user }) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [inputName, setInputName] = useState(name || "");
  const [inputDescription, inputSetDescription] = useState(description || "");

  function updateTheProfile() {
    const data = {
      id: user.id,
      name: inputName,
      description: inputDescription,
    };
    dispatch(updateProfile(data)).then(() =>
      alert.show("Name and description saved")
    );
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
        <button
          className="settings__btn-main"
          onClick={updateTheProfile}
          disabled={inputName.length + inputDescription.length === 0}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
