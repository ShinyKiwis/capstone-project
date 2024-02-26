"use client";
import React, { SyntheticEvent, useContext, useState } from "react";
import { ModalContext } from "@/app/providers/ModalProvider";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Button, Profile } from "@/app/_components";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import UserFilterButtons from "./components/FilterButtons";
import UsersSearchBar from "./components/UsersSearchBar";

const Administrate = () => {
  const [selectedFilter, setSelectedFilter] = useState("Dean");
  const [search, setSearch] = useState("");
  const [tableIsLoading, setTableIsLoading] = useState(false);

  const {
    data: usersData,
    isLoading,
    isRefetching,
  } = useQuery({
    queryFn: async () => {
      // let allUsers:User_AdminPage[] = await fetchUsers("");    // test using mock API
      let respond = await (await axios.get(`http://localhost:3500/users`)).data;

      // Initialize all rows on first fetch, the other times will be retreived from cache
      setRows(respond.users);
      return respond.users; // returned in userData const
    },
    queryKey: ["users"],
    staleTime: Infinity,
  });

  const [rows, setRows] = useState<User[]>(usersData ? usersData : []); // use data from cache if available

  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    console.error("Modal context initialization failed !");
    return null;
  }
  const { toggleModal, setModalType, setModalProps } = modalContextValue;

  // Functional handlers
  const handleFilter = async (selectedRole: Role) => {
    setTableIsLoading(true);
    let respond = await axios
      .get(`http://localhost:3500/users?role=${selectedRole.id}`)
      .catch((err) => {
        console.error("Err filtering users:", err);
      });

    setRows(respond ? respond.data.users : []);
    setTableIsLoading(false);
  };

  const handleSearchUser = async (query: string) => {
    // Call search from api and render results seperately, result is not cached
    setTableIsLoading(true);

    let respond = await axios
      .get(`http://localhost:3500/users?search=${query}`)
      .catch((err) => {
        console.error("Err searching users:", err);
      });

    setRows(respond ? respond.data.users : []);
    setTableIsLoading(false);
  };

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
    setModalType("user_deletion");
    setModalProps({
      targetUsr: row,
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
    {
      field: "roles",
      headerName: "Roles",
      minWidth: 150,
      flex: 3,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.roles.map(
          (role: { id: Number; name: String }) => role.name,
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 130,
      flex: 3,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className="flex gap-2">
            <Button
              isPrimary={true}
              variant="success"
              className="w-24 py-1 text-sm font-semibold"
              onClick={(e) => handleEditUser(e, params.row)}
            >
              Edit
            </Button>
            <Button
              isPrimary={true}
              variant="danger"
              className="w-24 py-1 text-sm font-semibold"
              onClick={(e) => handleDeleteUser(e, params.row)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="flex h-fit w-full py-6">
        <UserFilterButtons
          selectedFilter={selectedFilter}
          filterHandler={handleFilter}
        />
        <UsersSearchBar
          value={search}
          onChange={setSearch}
          searchHandler={handleSearchUser}
        />
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
          loading={tableIsLoading || isLoading || isRefetching}
        />
      </div>
    </div>
  );
};

export default Administrate;
