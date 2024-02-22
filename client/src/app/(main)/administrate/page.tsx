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
import axios from "axios";

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
      // let allUsers:User_AdminPage[] = await fetchUsers("");    // test using mock API
      let allUsers:User_AdminPage[] = await (await axios.get(`http://localhost:3500/users`)).data

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
    } else if (opt === "lecturers") {
      results = await filterUsersByRole("lecturer");
      setSelectedFilter("lecturers");
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
        return params.row.name;
      },

      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className="py-2">
            <Profile
              type="horizontal"
              username={params.row.name}
              email={params.row.email}
            />
          </div>
        );
      },
    },
    { field: "roles", headerName: "Roles", minWidth: 150, flex: 3, valueGetter: (params: GridValueGetterParams) => {
      return params.row.roles.map((role:{id:Number, name:String}) => role.name);
    }, },
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
            isPrimary={selectedFilter === "lecturers" ? true : false}
            variant="normal"
            className="px-4"
            onClick={() => handleFilter("lecturers")}
          >
            Lecturers
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
