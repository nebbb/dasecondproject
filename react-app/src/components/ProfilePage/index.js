import React, { useEffect } from "react";
import "./ProfilePage.css";
import { useDispatch, useSelector } from "react-redux";
import ProfileSection from "../ProfileSection";
import { loadHomeUsers } from "../../store/users";
import { loadSingleUser } from "../../store/user";
import LeftSideBar from "../LeftSideBar";
import RightSideBar from "../RightSideBar";
import { useParams } from "react-router";

export default function ProfilePage() {
  const dispatch = useDispatch();

  const { profileId } = useParams();
  const user = useSelector((state) => state.session.user);
  const users = useSelector((state) => Object.values(state.users));
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadSingleUser({ user_id: profileId })).then(() =>
      dispatch(loadHomeUsers())
    );
  }, [profileId]);
  return (
    <div className="profile__page--container">
      <LeftSideBar user={user} />
      <ProfileSection
        user={user}
        userId={profileId}
        currentUser={currentUser}
      />
      <RightSideBar users={users} />
    </div>
  );
}
