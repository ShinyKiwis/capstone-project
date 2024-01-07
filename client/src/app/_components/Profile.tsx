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

  const size = type === "vertical" ? "h-20 w-20 text-2xl": "h-8 w-8"
  return (
    <div className={`flex ${size} items-center justify-center rounded-full bg-blue font-semibold text-white`}>
      <span>{shortUsername}</span>
    </div>
  );
};

const Profile = ({ type, username, userAvatar, userId, email }: ProfileProps) => {
  switch (type){
    case 'horizontal':
      return (
        <div
          className={`flex gap-2 w-full items-center`}
        >
          {userAvatar ? 
          <Image src={userAvatar} width={50} height={50} alt="user profile" />:
          <DefaultProfileImage username={username} type={type}/>
          }
          <span className="text-lg">{username}</span>
        </div>
      );
    case 'vertical':
      return(
        <div
          className={`flex flex-col gap-2 w-full items-center`}
        >
          {userAvatar ? 
          <Image src={userAvatar} width={50} height={50} alt="user profile" />:
          <DefaultProfileImage username={username} type={type}/>
          }
          <span className="text-lg">{username}</span>
        </div>
      )
      
    case 'horizontal-detailed':
      return(
        <div
          className={`flex gap-2 w-full items-center`}
        >
          {userAvatar ? 
          <Image src={userAvatar} width={50} height={50} alt="user profile" />:
          <DefaultProfileImage username={username} type={type}/>
          }
          <div>
            <div className="text-lg break-normal">{username}</div>
            <div className="break-normal">{userId} - {email}</div>
          </div>
        </div>
      )
      
  }
  // return (
  //   <div
  //     className={`flex ${
  //       type == "horizontal" ? "gap-2" : "flex-col"
  //     } w-full items-center`}
  //   >
  //     {userAvatar ? 
  //     <Image src={userAvatar} width={50} height={50} alt="user profile" />:
  //     <DefaultProfileImage username={username} />
  //     }
  //     <span className="text-lg">{username}</span>
  //   </div>
  // );
};

export default Profile;
