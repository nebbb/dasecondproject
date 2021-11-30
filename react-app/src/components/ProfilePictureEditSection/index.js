import React, { useState } from "react";
import "./ProfilePictureEditSection.css";
import { changeProfileData } from "../../store/user";
import { useDispatch } from "react-redux";
import { loadSingleUser } from "../../store/user";
import { useAlert } from "react-alert";
import { authenticate } from "../../store/session";

export default function ProfilePictureEditSection({
  user,
  banner_pic,
  profile_pic,
}) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentImageURL, setCurrentImageURL] = useState("");
  const [currentImagePreviewURL, setCurrentImagePreviewURL] =
    useState(profile_pic);

  const [currentBannerURL, setCurrentBannerURL] = useState("");
  const [currentBannerPreviewURL, setCurrentBannerPreviewURL] =
    useState(banner_pic);

  // async function fallbackImage(base64URL) {
  //   let file = await fetch(base64URL)
  //     .then((r) => r.blob())
  //     .then(
  //       (blobFile) =>
  //         new File([blobFile], "fallbackImage", { type: "image/png" })
  //     );
  //   return file;
  // }

  function updateTheProfileData() {
    const data = {
      file: currentImageURL,
      file2: currentBannerURL,
      user_id: user.id,
    };
    dispatch(changeProfileData(data))
      .then(() => dispatch(authenticate()))
      .then(() => alert.show("Profile picture & banner saved"));
  }

  return (
    <div className="profile__picture--section">
      <div
        className="profile__picture--section-banner"
        style={{ backgroundImage: `url(${currentBannerPreviewURL})` }}
      >
        <img
          src={currentImagePreviewURL}
          alt="profile-pic-preview"
          className="profile__picture--section-img"
        />
      </div>
      <label className="new-p-upload" for="new-pic">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="19px"
          height="19px"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        Avatar
        <input
          id="new-pic"
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files.length) {
              setCurrentImagePreviewURL(URL.createObjectURL(e.target.files[0]));
            }
            setCurrentImageURL(e.target.files[0]);
          }}
        />
      </label>

      <label className="new-p-upload" for="new-pic">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          width="19px"
          height="19px"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        Banner
        <input
          id="new-pic"
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files.length) {
              setCurrentBannerPreviewURL(
                URL.createObjectURL(e.target.files[0])
              );
            }
            setCurrentBannerURL(e.target.files[0]);
          }}
        />
      </label>
      <button onClick={updateTheProfileData} className="settings__btn-main">
        Confirm
      </button>
    </div>
  );
}
