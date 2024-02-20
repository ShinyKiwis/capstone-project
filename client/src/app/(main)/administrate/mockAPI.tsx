// This file simulate api calls for users

export type User_AdminPage = {
  id: Number;
  fullName: String;
  email: String;
  roles: String[];
  active: String;
};

const users: User_AdminPage[] = [
  {
    id: 2053101,
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    roles: ["teacher", "student", "ATP", "dean"],
    active: "10 minutes ago",
  },
  {
    id: 2053102,
    fullName: "Trần Thị B",
    email: "tranthib@example.com",
    roles: ["student"],
    active: "5 minutes ago",
  },
  {
    id: 2053103,
    fullName: "Lê Văn C",
    email: "levanc@example.com",
    roles: ["teacher", "ATP", "dean"],
    active: "15 minutes ago",
  },
  {
    id: 2053104,
    fullName: "Phạm Thị D",
    email: "phamthid@example.com",
    roles: ["teacher"],
    active: "20 minutes ago",
  },
  {
    id: 2053105,
    fullName: "Hoàng Văn E",
    email: "hoangve@example.com",
    roles: ["teacher", "ATP"],
    active: "8 minutes ago",
  },
  {
    id: 2053106,
    fullName: "Nguyễn Thị F",
    email: "nguyenthif@example.com",
    roles: ["teacher"],
    active: "12 minutes ago",
  },
  {
    id: 2053107,
    fullName: "Lê Văn G",
    email: "levang@example.com",
    roles: ["student"],
    active: "3 minutes ago",
  },
  {
    id: 2053108,
    fullName: "Trần Văn H",
    email: "tranvh@example.com",
    roles: ["ATP"],
    active: "18 minutes ago",
  },
  {
    id: 2053109,
    fullName: "Phạm Thị I",
    email: "phamthii@example.com",
    roles: ["student"],
    active: "7 minutes ago",
  },
  {
    id: 2053110,
    fullName: "Hoàng Văn J",
    email: "hoangvj@example.com",
    roles: ["teacher", "ATP"],
    active: "14 minutes ago",
  },
  {
    id: 2053111,
    fullName: "Nguyễn Thị K",
    email: "nguyenthik@example.com",
    roles: ["student"],
    active: "9 minutes ago",
  },
  {
    id: 2053112,
    fullName: "Trần Văn L",
    email: "tranvl@example.com",
    roles: ["teacher", "ATP"],
    active: "11 minutes ago",
  },
  {
    id: 2053113,
    fullName: "Lê Thị M",
    email: "lethim@example.com",
    roles: ["student"],
    active: "16 minutes ago",
  },
  {
    id: 2053114,
    fullName: "Phạm Văn N",
    email: "phamvn@example.com",
    roles: ["teacher"],
    active: "4 minutes ago",
  },
  {
    id: 2053115,
    fullName: "Hoàng Thị O",
    email: "hoangthio@example.com",
    roles: ["ATP"],
    active: "13 minutes ago",
  },
  {
    id: 2053116,
    fullName: "Nguyễn Văn P",
    email: "nguyenvanp@example.com",
    roles: ["teacher", "student"],
    active: "6 minutes ago",
  },
  {
    id: 2053117,
    fullName: "Trần Thị Q",
    email: "tranthiq@example.com",
    roles: ["student"],
    active: "19 minutes ago",
  },
  {
    id: 2053118,
    fullName: "Lê Văn R",
    email: "levanr@example.com",
    roles: ["Dean"],
    active: "2 minutes ago",
  },
  {
    id: 2053119,
    fullName: "Phạm Thị S",
    email: "phamthis@example.com",
    roles: ["student"],
    active: "17 minutes ago",
  },
  {
    id: 2053120,
    fullName: "Hoàng Văn T",
    email: "hoangvt@example.com",
    roles: ["dean", "ATP"],
    active: "1 minute ago",
  },
  {
    id: 2053121,
    fullName: "Trần Thị U",
    email: "tranthiu@example.com",
    roles: ["student"],
    active: "8 minutes ago",
  },
  {
    id: 2053122,
    fullName: "Lê Văn V",
    email: "levanv@example.com",
    roles: ["dean"],
    active: "10 minutes ago",
  },
  {
    id: 2053123,
    fullName: "Nguyễn Thị X",
    email: "nguyenthix@example.com",
    roles: ["student", "ATP"],
    active: "15 minutes ago",
  },
  {
    id: 2053124,
    fullName: "Phạm Văn Y",
    email: "phamvany@example.com",
    roles: ["dean"],
    active: "3 minutes ago",
  },
  {
    id: 2053125,
    fullName: "Hoàng Thị Z",
    email: "hoangthiz@example.com",
    roles: ["ATP"],
    active: "12 minutes ago",
  },
  {
    id: 2053126,
    fullName: "Nguyễn Văn A1",
    email: "nguyenvana1@example.com",
    roles: ["dean", "student"],
    active: "5 minutes ago",
  },
  {
    id: 2053127,
    fullName: "Trần Thị B1",
    email: "tranthib1@example.com",
    roles: ["student"],
    active: "18 minutes ago",
  },
  {
    id: 2053128,
    fullName: "Lê Văn C1",
    email: "levanc1@example.com",
    roles: ["ATP"],
    active: "7 minutes ago",
  },
  {
    id: 2053129,
    fullName: "Phạm Thị D1",
    email: "phamthid1@example.com",
    roles: ["student"],
    active: "14 minutes ago",
  },
  {
    id: 2053130,
    fullName: "Hoàng Văn E1",
    email: "hoangve1@example.com",
    roles: ["teacher", "ATP"],
    active: "2 minutes ago",
  },
  {
    id: 2053131,
    fullName: "Nguyễn Văn F1",
    email: "nguyenvanf1@example.com",
    roles: ["teacher", "ATP"],
    active: "6 minutes ago",
  },
  {
    id: 2053132,
    fullName: "Trần Thị G1",
    email: "tranthig1@example.com",
    roles: ["student"],
    active: "11 minutes ago",
  },
  {
    id: 2053133,
    fullName: "Lê Văn H1",
    email: "levanh1@example.com",
    roles: ["ATP"],
    active: "9 minutes ago",
  },
  {
    id: 2053134,
    fullName: "Phạm Thị I1",
    email: "phamthii1@example.com",
    roles: ["teacher"],
    active: "13 minutes ago",
  },
  {
    id: 2053135,
    fullName: "Hoàng Văn K1",
    email: "hoangvank1@example.com",
    roles: ["student"],
    active: "4 minutes ago",
  },
  {
    id: 2053136,
    fullName: "Nguyễn Thị L1",
    email: "nguyenthil1@example.com",
    roles: ["teacher", "ATP"],
    active: "16 minutes ago",
  },
  {
    id: 2053137,
    fullName: "Trần Văn M1",
    email: "tranvanm1@example.com",
    roles: ["student"],
    active: "1 minute ago",
  },
  {
    id: 2053138,
    fullName: "Lê Thị N1",
    email: "lethin1@example.com",
    roles: ["ATP"],
    active: "17 minutes ago",
  },
  {
    id: 2053139,
    fullName: "Phạm Văn P1",
    email: "phamvanp1@example.com",
    roles: ["teacher"],
    active: "7 minutes ago",
  },
  {
    id: 2053140,
    fullName: "Hoàng Thị Q1",
    email: "hoangthiq1@example.com",
    roles: ["ATP"],
    active: "10 minutes ago",
  },
];

const userRoles = [
  {
    id: 1,
    name: "Student",
  },
  {
    id: 2,
    name: "Teacher",
  },
  {
    id: 3,
    name: "Department Head",
  },
  {
    id: 4,
    name: "Program Chair",
  },
  {
    id: 5,
    name: "Dean",
  },
]; // retreive from db ?

/**
 * Mock function that mimics fetchingfrom a database.
 */
export const fetchUsers = async (query = ""): Promise<User_AdminPage[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Search by id or full name
  const filteredusers = users.filter((user) =>
    user.id.toString().includes(query) || user.fullName.includes(query),
  );

  return [...filteredusers];
};

export const filterUsersByRole = async (role:string): Promise<User_AdminPage[]> => {
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
  newRoles: Number[],
): Promise<User_AdminPage> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let targetUsrIdx = users.findIndex((usr) => {
    return usr.id === targetID;
  });

  // User is stored in memory and cleared on page reload
  users[targetUsrIdx].roles = userRoles
    .filter((obj) => obj.id === targetID) // Filter objects based on id
    .map((obj) => obj.name); // Extract names from filtered objects
  console.log("User role modified !");

  return users[targetUsrIdx];
};
