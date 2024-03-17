import { Avatar } from "@mantine/core";
import Image from "next/image";
import React from "react";
import { getShortUserName } from "../lib/getShortName";

interface ProfileProps {
  type: string;
  username: string;
  userAvatar?: string;
  userId?: string;
  email?: string;
}

const Profile = ({
  type,
  username,
  userAvatar,
  userId,
  email,
}: ProfileProps) => {
  return username ? (
    <div
      className={`flex items-center ${
        type == "horizontal" ? "gap-4" : "flex-col"
      } w-full`}
    >
      {userAvatar ? (
        <Image src={userAvatar} width={40} height={40} alt="user profile" />
      ) : (
        <Avatar color="blue">
          {getShortUserName(username)}
        </Avatar>
      )}
      <div
        className={`flex gap-2 ${type === "vertical" ? "flex-col items-center" : "flex-col"}`}
      >
        <span className="text-md">{username}</span>
        {email && (
          <span>
            {userId ? `${userId} - ` : ""}
            {email}
          </span>
        )}
      </div>
    </div>
  ) : <></>;
};

export default Profile;
