import Image from "next/image";
import React from "react";

interface ProfileProps {
  type: string;
  username: string;
  userAvatar?: string;
}

const DefaultProfileImage = ({ username }: { username: string }) => {
  const shortUsername = username
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .slice(-2)
    .join("");
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue font-semibold text-white">
      <span>{shortUsername}</span>
    </div>
  );
};

const Profile = ({ type, username, userAvatar }: ProfileProps) => {
  return (
    <div
      className={`flex ${
        type == "horizontal" ? "gap-2" : "flex-col"
      } w-full items-center`}
    >
      {userAvatar ? 
      <Image src={userAvatar} width={50} height={50} alt="user profile" />:
      <DefaultProfileImage username={username} />
      }
      <span className="text-lg">{username}</span>
    </div>
  );
};

export default Profile;
