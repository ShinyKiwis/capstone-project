import Image from "next/image";
import React from "react";

interface ProfileProps {
  type: string;
  username: string;
  userAvatar?: string;
  userId?: string;
  email?: string
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

  const size = type === "vertical" ? "h-20 w-20 text-2xl" : "h-12 w-12"
  return (
    <div className={`flex ${size} items-center justify-center rounded-full bg-blue font-semibold text-white`}>
      <span className="text-md">{shortUsername}</span>
    </div>
  );
};

const Profile = ({ type, username, userAvatar, userId, email }: ProfileProps) => {
  return (
    <div
      className={`flex items-center ${type == "horizontal" ? "gap-4" : "flex-col"
        } w-full`}
    >
      {userAvatar ?
        <Image src={userAvatar} width={50} height={50} alt="user profile" /> :
        <DefaultProfileImage username={username} type={type} />
      }
      <div className={`flex gap-2 ${type==="vertical" ? "flex-col items-center": "flex-col"}`}>
        <span className="text-lg">{username}</span>
        {email && <span>{userId ? `${userId} - `: ""}{email}</span>}
      </div>
    </div >
  );
};

export default Profile;
