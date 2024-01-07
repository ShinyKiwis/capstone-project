import Image from "next/image";
import React from "react";

interface ProfileProps {
  type: string;
  username: string;
  userAvatar?: string;
  email?: string;
}

const DefaultProfileImage = ({
  username,
  type,
}: {
  username: string;
  type: string;
}) => {
  const shortUsername = username
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .slice(-2)
    .join("");

  const size = type === "vertical" ? "h-20 w-20 text-2xl": "h-8 w-8"
  return (
    <div className={`flex ${size} items-center justify-center rounded-full bg-blue font-semibold text-white`}>
      <span>{shortUsername}</span>
    </div>
  );
};

const Profile = ({ type, username, userAvatar, email }: ProfileProps) => {
  return (
    <div
      className={`flex ${
        type == "horizontal" ? "gap-2" : "flex-col"
      } w-full items-center`}
    >
      {userAvatar ? (
        <Image src={userAvatar} width={50} height={50} alt="user profile" />
      ) : (
        <DefaultProfileImage username={username} type={type} />
      )}
      <span className="text-lg">{username}</span>
      <span>{email}</span>
    </div>
  );
};

export default Profile;
