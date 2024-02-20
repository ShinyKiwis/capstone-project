"use client";
import React, { SyntheticEvent, useContext, useState } from "react";
import { ModalContext } from "@/app/providers/ModalProvider";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Button, Profile, SearchBox } from "@/app/_components";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { User_AdminPage, fetchUsers, filterUsersByRole } from "./mockAPI";
import { BiSearch } from "react-icons/bi";

// const users = [
//   {
//     id: 2053101,
//     fullName: "Nguyễn Văn A",
//     email: "nguyenvana@example.com",
//     roles: ["teacher", "student", "ATP", "dean"],
//     active: "10 minutes ago",
//   },
//   {
//     id: 2053102,
//     fullName: "Trần Thị B",
//     email: "tranthib@example.com",
//     roles: ["student"],
//     active: "5 minutes ago",
//   },
//   {
//     id: 2053103,
//     fullName: "Lê Văn C",
//     email: "levanc@example.com",
//     roles: ["teacher", "ATP", "dean"],
//     active: "15 minutes ago",
//   },
//   {
//     id: 2053104,
//     fullName: "Phạm Thị D",
//     email: "phamthid@example.com",
//     roles: ["teacher"],
//     active: "20 minutes ago",
//   },
//   {
//     id: 2053105,
//     fullName: "Hoàng Văn E",
//     email: "hoangve@example.com",
//     roles: ["teacher", "ATP"],
//     active: "8 minutes ago",
//   },
//   {
//     id: 2053106,
//     fullName: "Nguyễn Thị F",
//     email: "nguyenthif@example.com",
//     roles: ["teacher"],
//     active: "12 minutes ago",
//   },
//   {
//     id: 2053107,
//     fullName: "Lê Văn G",
//     email: "levang@example.com",
//     roles: ["student"],
//     active: "3 minutes ago",
//   },
//   {
//     id: 2053108,
//     fullName: "Trần Văn H",
//     email: "tranvh@example.com",
//     roles: ["ATP"],
//     active: "18 minutes ago",
//   },
//   {
//     id: 2053109,
//     fullName: "Phạm Thị I",
//     email: "phamthii@example.com",
//     roles: ["student"],
//     active: "7 minutes ago",
//   },
//   {
//     id: 2053110,
//     fullName: "Hoàng Văn J",
//     email: "hoangvj@example.com",
//     roles: ["teacher", "ATP"],
//     active: "14 minutes ago",
//   },
//   {
//     id: 2053111,
//     fullName: "Nguyễn Thị K",
//     email: "nguyenthik@example.com",
//     roles: ["student"],
//     active: "9 minutes ago",
//   },
//   {
//     id: 2053112,
//     fullName: "Trần Văn L",
//     email: "tranvl@example.com",
//     roles: ["teacher", "ATP"],
//     active: "11 minutes ago",
//   },
//   {
//     id: 2053113,
//     fullName: "Lê Thị M",
//     email: "lethim@example.com",
//     roles: ["student"],
//     active: "16 minutes ago",
//   },
//   {
//     id: 2053114,
//     fullName: "Phạm Văn N",
//     email: "phamvn@example.com",
//     roles: ["teacher"],
//     active: "4 minutes ago",
//   },
//   {
//     id: 2053115,
//     fullName: "Hoàng Thị O",
//     email: "hoangthio@example.com",
//     roles: ["ATP"],
//     active: "13 minutes ago",
//   },
//   {
//     id: 2053116,
//     fullName: "Nguyễn Văn P",
//     email: "nguyenvanp@example.com",
//     roles: ["teacher", "student"],
//     active: "6 minutes ago",
//   },
//   {
//     id: 2053117,
//     fullName: "Trần Thị Q",
//     email: "tranthiq@example.com",
//     roles: ["student"],
//     active: "19 minutes ago",
//   },
//   {
//     id: 2053118,
//     fullName: "Lê Văn R",
//     email: "levanr@example.com",
//     roles: ["Dean"],
//     active: "2 minutes ago",
//   },
//   {
//     id: 2053119,
//     fullName: "Phạm Thị S",
//     email: "phamthis@example.com",
//     roles: ["student"],
//     active: "17 minutes ago",
//   },
//   {
//     id: 2053120,
//     fullName: "Hoàng Văn T",
//     email: "hoangvt@example.com",
//     roles: ["dean", "ATP"],
//     active: "1 minute ago",
//   },
//   {
//     id: 2053121,
//     fullName: "Trần Thị U",
//     email: "tranthiu@example.com",
//     roles: ["student"],
//     active: "8 minutes ago",
//   },
//   {
//     id: 2053122,
//     fullName: "Lê Văn V",
//     email: "levanv@example.com",
//     roles: ["dean"],
//     active: "10 minutes ago",
//   },
//   {
//     id: 2053123,
//     fullName: "Nguyễn Thị X",
//     email: "nguyenthix@example.com",
//     roles: ["student", "ATP"],
//     active: "15 minutes ago",
//   },
//   {
//     id: 2053124,
//     fullName: "Phạm Văn Y",
//     email: "phamvany@example.com",
//     roles: ["dean"],
//     active: "3 minutes ago",
//   },
//   {
//     id: 2053125,
//     fullName: "Hoàng Thị Z",
//     email: "hoangthiz@example.com",
//     roles: ["ATP"],
//     active: "12 minutes ago",
//   },
//   {
//     id: 2053126,
//     fullName: "Nguyễn Văn A1",
//     email: "nguyenvana1@example.com",
//     roles: ["dean", "student"],
//     active: "5 minutes ago",
//   },
//   {
//     id: 2053127,
//     fullName: "Trần Thị B1",
//     email: "tranthib1@example.com",
//     roles: ["student"],
//     active: "18 minutes ago",
//   },
//   {
//     id: 2053128,
//     fullName: "Lê Văn C1",
//     email: "levanc1@example.com",
//     roles: ["ATP"],
//     active: "7 minutes ago",
//   },
//   {
//     id: 2053129,
//     fullName: "Phạm Thị D1",
//     email: "phamthid1@example.com",
//     roles: ["student"],
//     active: "14 minutes ago",
//   },
//   {
//     id: 2053130,
//     fullName: "Hoàng Văn E1",
//     email: "hoangve1@example.com",
//     roles: ["teacher", "ATP"],
//     active: "2 minutes ago",
//   },
//   {
//     id: 2053131,
//     fullName: "Nguyễn Văn F1",
//     email: "nguyenvanf1@example.com",
//     roles: ["teacher", "ATP"],
//     active: "6 minutes ago",
//   },
//   {
//     id: 2053132,
//     fullName: "Trần Thị G1",
//     email: "tranthig1@example.com",
//     roles: ["student"],
//     active: "11 minutes ago",
//   },
//   {
//     id: 2053133,
//     fullName: "Lê Văn H1",
//     email: "levanh1@example.com",
//     roles: ["ATP"],
//     active: "9 minutes ago",
//   },
//   {
//     id: 2053134,
//     fullName: "Phạm Thị I1",
//     email: "phamthii1@example.com",
//     roles: ["teacher"],
//     active: "13 minutes ago",
//   },
//   {
//     id: 2053135,
//     fullName: "Hoàng Văn K1",
//     email: "hoangvank1@example.com",
//     roles: ["student"],
//     active: "4 minutes ago",
//   },
//   {
//     id: 2053136,
//     fullName: "Nguyễn Thị L1",
//     email: "nguyenthil1@example.com",
//     roles: ["teacher", "ATP"],
//     active: "16 minutes ago",
//   },
//   {
//     id: 2053137,
//     fullName: "Trần Văn M1",
//     email: "tranvanm1@example.com",
//     roles: ["student"],
//     active: "1 minute ago",
//   },
//   {
//     id: 2053138,
//     fullName: "Lê Thị N1",
//     email: "lethin1@example.com",
//     roles: ["ATP"],
//     active: "17 minutes ago",
//   },
//   {
//     id: 2053139,
//     fullName: "Phạm Văn P1",
//     email: "phamvanp1@example.com",
//     roles: ["teacher"],
//     active: "7 minutes ago",
//   },
//   {
//     id: 2053140,
//     fullName: "Hoàng Thị Q1",
//     email: "hoangthiq1@example.com",
//     roles: ["ATP"],
//     active: "10 minutes ago",
//   },
// ];

const Administrate = () => {
  const [selectedFilter, setSelectedFilter] = useState("deans");
  const [search, setSearch] = useState("");
  const [tableIsLoading, setTableIsLoading] = useState(false);

  const {
    data: usersData,
    isLoading,
    isRefetching,
  } = useQuery({
    queryFn: async () => {
      let allUsers = await fetchUsers(""); // Via api
      // Initialize all rows on first fetch, the other times will be retreived from cache
      setRows(allUsers);
      return allUsers; // returned in userData const
    },
    queryKey: ["users"],
    staleTime: Infinity,
  });
  const [rows, setRows] = useState<User_AdminPage[]>(
    usersData ? usersData : [],
  ); // use data from cache if available

  const handleFilter = async (opt: string) => {
    if (!usersData) return;

    let results: User_AdminPage[] = [];
    setTableIsLoading(true);

    // Call filter API and retrieve results
    if (opt === "deans") {
      results = await filterUsersByRole("Dean");
      setSelectedFilter("deans");
    } else if (opt === "instructors") {
      results = await filterUsersByRole("Teacher");
      setSelectedFilter("instructors");
    } else {
      results = await filterUsersByRole("Student");
      setSelectedFilter("students");
    }

    setTableIsLoading(false);
    setRows(results);
  };

  const handleSearchUser = async (query: string) => {
    // Call search from api and render results seperately, result is not cached
    setTableIsLoading(true);
    let results = await fetchUsers(query);

    setTableIsLoading(false);
    setRows(results);
  };

  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    console.error("Modal context initialization failed !");
    return null;
  }
  const { toggleModal, setModalType, setModalProps } = modalContextValue;

  const handleEditUser = (e: SyntheticEvent, row: any) => {
    // alert("Edit:" + uid);
    e.stopPropagation();
    let clickedBtn = e.target as HTMLElement;
    let clickedBtnCoords = clickedBtn.getBoundingClientRect();

    setModalType("customPos_user_edit");
    setModalProps({
      targetUsr: row,
      position: { x: clickedBtnCoords.x, y: clickedBtnCoords.y },
    });
    toggleModal(true);
  };

  const handleDeleteUser = (e: SyntheticEvent, row: any) => {
    // alert("Delete:" + uid);
    e.stopPropagation();
    console.log("e object:", e);
    setModalType("status_warning");
    setModalProps({
      title: "Deleting a user !",
      messages: [
        "Are you sure you want to remove this user ?",
        "This action cannot be undone !",
      ],
    });
    toggleModal(true);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID number",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "user",
      headerName: "User",
      minWidth: 250,
      flex: 4,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.fullName;
      },

      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className="py-2">
            <Profile
              type="horizontal"
              username={params.row.fullName}
              email={params.row.email}
            />
          </div>
        );
      },
    },
    { field: "roles", headerName: "Roles", minWidth: 150, flex: 3 },
    { field: "active", headerName: "Last active", minWidth: 150, flex: 3 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 130,
      flex: 2,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div>
            <button
              className="mx-2 bg-lightgreen px-2 py-1 text-white"
              onClick={(e) => handleEditUser(e, params.row)}
            >
              Edit
            </button>
            <button
              className="mx-2 bg-red px-2 py-1 text-white"
              onClick={(e) => handleDeleteUser(e, params.id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  if (isLoading) return <div>Loading users...</div>;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="flex h-fit w-full py-6">
        <div className="flex gap-6">
          <Button
            isPrimary={selectedFilter === "deans" ? true : false}
            variant="normal"
            className="px-4 py-1"
            onClick={() => handleFilter("deans")}
          >
            Deans
          </Button>
          <Button
            isPrimary={selectedFilter === "instructors" ? true : false}
            variant="normal"
            className="px-4"
            onClick={() => handleFilter("instructors")}
          >
            Instructors
          </Button>
          <Button
            isPrimary={selectedFilter === "students" ? true : false}
            variant="normal"
            className="px-4"
            onClick={() => handleFilter("students")}
          >
            Students
          </Button>
        </div>
        <div className="ml-auto w-96">
          <div className="group flex w-full items-center gap-2 rounded-md border-2 border-gray px-4 py-2 focus-within:border-blue">
            <input
              type="text"
              placeholder="Search user name, id..."
              className="w-full outline-none"
              value={search}
              onInput={(e) => setSearch(e.currentTarget.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchUser(search);
                }
              }}
            />
            <button
              onClick={() => {
                handleSearchUser(search);
              }}
            >
              <BiSearch
                size={30}
                className="text-gray group-focus-within:text-blue"
              />
            </button>
          </div>
        </div>
      </div>

      <div style={{ flex: "1 1 0%", minHeight: 0, width: "100%" }}>
        <DataGrid
          rows={rows || []}
          columns={columns}
          sx={{
            ".MuiDataGrid-columnHeaders": {
              background: "rgba(153, 194, 255, 0.20)",
            },
            ".MuiDataGrid-columnHeaderTitle": {
              fontWeight: 600,
            },
          }}
          getRowHeight={() => "auto"}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20, 50, 100]}
          checkboxSelection
          loading={tableIsLoading || isRefetching}
        />
      </div>
    </div>
  );
};

export default Administrate;
