// This file simulate api calls for users

export type User_AdminPage = {
  id: number;
  name: string;
  email: string;
  roles: {
    id: number;
    name: string;
  }[];
  active: string;
};

// const users: User_AdminPage[] = [
//   {
//     id: 2053101,
//     name: "Nguyễn Văn A",
//     email: "nguyenvana@example.com",
//     roles: ["Teacher", "Student", "ATP", "Dean"],
//     active: "10 minutes ago",
//   },
//   {
//     id: 2053102,
//     name: "Trần Thị B",
//     email: "tranthib@example.com",
//     roles: ["Student"],
//     active: "5 minutes ago",
//   },
//   {
//     id: 2053103,
//     name: "Lê Văn C",
//     email: "levanc@example.com",
//     roles: ["Teacher", "ATP", "Dean"],
//     active: "15 minutes ago",
//   },
//   {
//     id: 2053104,
//     name: "Phạm Thị D",
//     email: "phamthid@example.com",
//     roles: ["Teacher"],
//     active: "20 minutes ago",
//   },
//   {
//     id: 2053105,
//     name: "Hoàng Văn E",
//     email: "hoangve@example.com",
//     roles: ["Teacher", "ATP"],
//     active: "8 minutes ago",
//   },
//   {
//     id: 2053106,
//     name: "Nguyễn Thị F",
//     email: "nguyenthif@example.com",
//     roles: ["Teacher"],
//     active: "12 minutes ago",
//   },
//   {
//     id: 2053107,
//     name: "Lê Văn G",
//     email: "levang@example.com",
//     roles: ["Student"],
//     active: "3 minutes ago",
//   },
//   {
//     id: 2053108,
//     name: "Trần Văn H",
//     email: "tranvh@example.com",
//     roles: ["ATP"],
//     active: "18 minutes ago",
//   },
//   {
//     id: 2053109,
//     name: "Phạm Thị I",
//     email: "phamthii@example.com",
//     roles: ["Student"],
//     active: "7 minutes ago",
//   },
//   {
//     id: 2053110,
//     name: "Hoàng Văn J",
//     email: "hoangvj@example.com",
//     roles: ["Teacher", "ATP"],
//     active: "14 minutes ago",
//   },
//   {
//     id: 2053111,
//     name: "Nguyễn Thị K",
//     email: "nguyenthik@example.com",
//     roles: ["Student"],
//     active: "9 minutes ago",
//   },
//   {
//     id: 2053112,
//     name: "Trần Văn L",
//     email: "tranvl@example.com",
//     roles: ["Teacher", "ATP"],
//     active: "11 minutes ago",
//   },
//   {
//     id: 2053113,
//     name: "Lê Thị M",
//     email: "lethim@example.com",
//     roles: ["Student"],
//     active: "16 minutes ago",
//   },
//   {
//     id: 2053114,
//     name: "Phạm Văn N",
//     email: "phamvn@example.com",
//     roles: ["Teacher"],
//     active: "4 minutes ago",
//   },
//   {
//     id: 2053115,
//     name: "Hoàng Thị O",
//     email: "hoangthio@example.com",
//     roles: ["ATP"],
//     active: "13 minutes ago",
//   },
//   {
//     id: 2053116,
//     name: "Nguyễn Văn P",
//     email: "nguyenvanp@example.com",
//     roles: ["Teacher", "Student"],
//     active: "6 minutes ago",
//   },
//   {
//     id: 2053117,
//     name: "Trần Thị Q",
//     email: "tranthiq@example.com",
//     roles: ["Student"],
//     active: "19 minutes ago",
//   },
//   {
//     id: 2053118,
//     name: "Lê Văn R",
//     email: "levanr@example.com",
//     roles: ["Dean"],
//     active: "2 minutes ago",
//   },
//   {
//     id: 2053119,
//     name: "Phạm Thị S",
//     email: "phamthis@example.com",
//     roles: ["Student"],
//     active: "17 minutes ago",
//   },
//   {
//     id: 2053120,
//     name: "Hoàng Văn T",
//     email: "hoangvt@example.com",
//     roles: ["Dean", "ATP"],
//     active: "1 minute ago",
//   },
//   {
//     id: 2053121,
//     name: "Trần Thị U",
//     email: "tranthiu@example.com",
//     roles: ["Student"],
//     active: "8 minutes ago",
//   },
//   {
//     id: 2053122,
//     name: "Lê Văn V",
//     email: "levanv@example.com",
//     roles: ["Dean"],
//     active: "10 minutes ago",
//   },
//   {
//     id: 2053123,
//     name: "Nguyễn Thị X",
//     email: "nguyenthix@example.com",
//     roles: ["Student", "ATP"],
//     active: "15 minutes ago",
//   },
//   {
//     id: 2053124,
//     name: "Phạm Văn Y",
//     email: "phamvany@example.com",
//     roles: ["Dean"],
//     active: "3 minutes ago",
//   },
//   {
//     id: 2053125,
//     name: "Hoàng Thị Z",
//     email: "hoangthiz@example.com",
//     roles: ["ATP"],
//     active: "12 minutes ago",
//   },
//   {
//     id: 2053126,
//     name: "Nguyễn Văn A1",
//     email: "nguyenvana1@example.com",
//     roles: ["Dean", "Student"],
//     active: "5 minutes ago",
//   },
//   {
//     id: 2053127,
//     name: "Trần Thị B1",
//     email: "tranthib1@example.com",
//     roles: ["Student"],
//     active: "18 minutes ago",
//   },
//   {
//     id: 2053128,
//     name: "Lê Văn C1",
//     email: "levanc1@example.com",
//     roles: ["ATP"],
//     active: "7 minutes ago",
//   },
//   {
//     id: 2053129,
//     name: "Phạm Thị D1",
//     email: "phamthid1@example.com",
//     roles: ["Student"],
//     active: "14 minutes ago",
//   },
//   {
//     id: 2053130,
//     name: "Hoàng Văn E1",
//     email: "hoangve1@example.com",
//     roles: ["Teacher", "ATP"],
//     active: "2 minutes ago",
//   },
//   {
//     id: 2053131,
//     name: "Nguyễn Văn F1",
//     email: "nguyenvanf1@example.com",
//     roles: ["Teacher", "ATP"],
//     active: "6 minutes ago",
//   },
//   {
//     id: 2053132,
//     name: "Trần Thị G1",
//     email: "tranthig1@example.com",
//     roles: ["Student"],
//     active: "11 minutes ago",
//   },
//   {
//     id: 2053133,
//     name: "Lê Văn H1",
//     email: "levanh1@example.com",
//     roles: ["ATP"],
//     active: "9 minutes ago",
//   },
//   {
//     id: 2053134,
//     name: "Phạm Thị I1",
//     email: "phamthii1@example.com",
//     roles: ["Teacher"],
//     active: "13 minutes ago",
//   },
//   {
//     id: 2053135,
//     name: "Hoàng Văn K1",
//     email: "hoangvank1@example.com",
//     roles: ["Student"],
//     active: "4 minutes ago",
//   },
//   {
//     id: 2053136,
//     name: "Nguyễn Thị L1",
//     email: "nguyenthil1@example.com",
//     roles: ["Teacher", "ATP"],
//     active: "16 minutes ago",
//   },
//   {
//     id: 2053137,
//     name: "Trần Văn M1",
//     email: "tranvanm1@example.com",
//     roles: ["Student"],
//     active: "1 minute ago",
//   },
//   {
//     id: 2053138,
//     name: "Lê Thị N1",
//     email: "lethin1@example.com",
//     roles: ["ATP"],
//     active: "17 minutes ago",
//   },
//   {
//     id: 2053139,
//     name: "Phạm Văn P1",
//     email: "phamvanp1@example.com",
//     roles: ["Teacher"],
//     active: "7 minutes ago",
//   },
//   {
//     id: 2053140,
//     name: "Hoàng Thị Q1",
//     email: "hoangthiq1@example.com",
//     roles: ["ATP"],
//     active: "10 minutes ago",
//   },
// ];

const userRoles = [
  {
    id: 1,
    name: "Student",
  },
  {
    id: 2,
    name: "Teacher",
  },
  // {
  //   id: 3,
  //   name: "Department Head",
  // },
  // {
  //   id: 4,
  //   name: "Program Chair",
  // },
  {
    id: 5,
    name: "Dean",
  },
  {
    id: 6,
    name: "ATP",
  },
]; // retreive from db ?

/**
 * Mock function that mimics fetchingfrom a database.
 */
export const fetchUsers = async (query = ""): Promise<User_AdminPage[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('Called fetch API')
  // Search by id or full name
  const filteredusers = users.filter((user) =>
    user.id.toString().includes(query) || user.name.includes(query),
  );

  return [...filteredusers];
};


/**
 * Mock function that mimics filtering users by role
 */
export const filterUsersByRole = async (role:string): Promise<User[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Search by id or full name
  const filteredusers = users.filter((user) =>
    user.roles.includes(role)
  );

  return [...filteredusers];
};

/**
 * Mock function that mimics modifying roles of a user.
 */
export const editUser = async (
  targetID: Number,
  newRoleIds: Number[],
): Promise<User_AdminPage> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let targetUsrIdx = users.findIndex((usr) => {
    return usr.id === targetID;
  });

  // User is stored in memory and cleared on page reload
  let newRoles = newRoleIds.map(roleID => userRoles.find(role => role.id === roleID))
  // console.log("New roles:", newRoleNames)

  if (newRoles)
    users[targetUsrIdx].roles = newRoles;

  return users[targetUsrIdx];
};
