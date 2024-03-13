"use client";

import { Profile, RemoveModal } from "@/app/_components";
import { Button } from "@mantine/core";
import {
  DataGrid,
  GridColDef,
  GridColumnMenu,
  GridColumnMenuProps,
  GridRenderCellParams,
  GridSlotsComponentsProps,
  GridValueGetterParams,
  useGridApiRef,
  GridFooterContainer,
  GridFooter,
} from "@mui/x-data-grid";
import React, { SyntheticEvent, useContext, useState } from "react";
import UserFilterButtons from "./components/FilterButtons";
import UsersSearchBar from "./components/UsersSearchBar";
import StripedDataGrid from "@/app/_components/StripedDataGrid";
import UserRolesModal from "./components/UserRolesModal";

const Users = () => {
  const gridRef = useGridApiRef();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [tableIsLoading, setTableIsLoading] = useState(false);
  const [roleModalOpened, setRoleModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [selectedRows, setSelectedRows] = useState<User_ManageTable[]>([]); // Selected targets for deletion and editing

  const usersData: User_ManageTable[] = [
    {
      id: 2053101,
      name: "Nguyễn An",
      email: "user2053101@example.com",
      roles: [{ id: 1, name: "Teacher" }],
    },
    {
      id: 2053102,
      name: "Trần Bình",
      email: "user2053102@example.com",
      roles: [{ id: 2, name: "Student" }],
    },
    {
      id: 2053103,
      name: "Lê Châu",
      email: "user2053103@example.com",
      roles: [{ id: 3, name: "Department Head" }],
    },
    {
      id: 2053104,
      name: "Phạm Dũng",
      email: "user2053104@example.com",
      roles: [{ id: 4, name: "Program Chair" }],
    },
    {
      id: 2053105,
      name: "Hoàng Hiếu",
      email: "user2053105@example.com",
      roles: [{ id: 5, name: "Dean" }],
    },
    {
      id: 2053106,
      name: "Huỳnh Khánh",
      email: "user2053106@example.com",
      roles: [{ id: 1, name: "Teacher" }],
    },
    {
      id: 2053107,
      name: "Phan Linh",
      email: "user2053107@example.com",
      roles: [{ id: 2, name: "Student" }],
    },
    {
      id: 2053108,
      name: "Vũ Minh",
      email: "user2053108@example.com",
      roles: [{ id: 3, name: "Department Head" }],
    },
    {
      id: 2053109,
      name: "Võ Nga",
      email: "user2053109@example.com",
      roles: [{ id: 4, name: "Program Chair" }],
    },
    {
      id: 2053110,
      name: "Đặng Quang",
      email: "user2053110@example.com",
      roles: [{ id: 5, name: "Dean" }],
    },
    {
      id: 2053111,
      name: "Bùi An",
      email: "user2053111@example.com",
      roles: [{ id: 1, name: "Teacher" }],
    },
    {
      id: 2053112,
      name: "Đỗ Bình",
      email: "user2053112@example.com",
      roles: [{ id: 2, name: "Student" }],
    },
    {
      id: 2053113,
      name: "Hồ Châu",
      email: "user2053113@example.com",
      roles: [{ id: 3, name: "Department Head" }],
    },
    {
      id: 2053114,
      name: "Ngô Dũng",
      email: "user2053114@example.com",
      roles: [{ id: 4, name: "Program Chair" }],
    },
    {
      id: 2053115,
      name: "Dương Hiếu",
      email: "user2053115@example.com",
      roles: [{ id: 5, name: "Dean" }],
    },
    {
      id: 2053116,
      name: "Lý Khánh",
      email: "user2053116@example.com",
      roles: [{ id: 1, name: "Teacher" }],
    },
  ];

  // const {
  //   data: usersData,
  //   isLoading,
  //   isRefetching,
  // } = useQuery({
  //   queryFn: async () => {
  //     // let allUsers:User_AdminPage[] = await fetchUsers("");    // test using mock API
  //     let respond = await (await axios.get(`http://localhost:3500/users`)).data;

  //     // Initialize all rows on first fetch, the other times will be retreived from cache
  //     setRows(respond.users);
  //     return respond.users; // returned in userData const
  //   },
  //   queryKey: ["users"],
  //   staleTime: Infinity,
  // });

  const [rows, setRows] = useState<User_ManageTable[]>(
    usersData ? usersData : [],
  ); // use data from cache if available

  // Functional handlers
  const handleFilter = async (selectedRole: Role) => {
    setTableIsLoading(true);
    // let respond = await axios
    //   .get(`http://localhost:3500/users?role=${selectedRole.id}`)
    //   .catch((err) => {
    //     console.error("Err filtering users:", err);
    //   });

    // setRows(respond ? respond.data.users : []);
    setSelectedFilter(selectedRole.name);
    setTimeout(() => {
      setTableIsLoading(false);
    }, 1500);
  };

  const handleSearchUser = async (query: string) => {
    // Call search from api and render results seperately, result is not cached
    setTableIsLoading(true);

    // let respond = await axios
    //   .get(`http://localhost:3500/users?search=${query}`)
    //   .catch((err) => {
    //     console.error("Err searching users:", err);
    //   });

    // setRows(respond ? respond.data.users : []);
    setTimeout(() => {
      setTableIsLoading(false);
    }, 1500);
  };

  const handleEditUser = (e: SyntheticEvent, row: any) => {
    // let clickedBtn = e.target as HTMLElement;
    // let clickedBtnCoords = clickedBtn.getBoundingClientRect();

    setSelectedRows([row]);
    setRoleModalOpened(true);
  };

  const handleEdit_multi = () => {
    let selectedRows = gridRef.current.getSelectedRows();
    let selectedRowsArray: any[] = [];
    selectedRows.forEach((value, key) => {
      selectedRowsArray = [...selectedRowsArray, value];
    });

    setSelectedRows(selectedRowsArray);
    setRoleModalOpened(true);
  };

  const handleDeleteUser = (e: SyntheticEvent, row: any) => {
    let selectedRows = gridRef.current.getSelectedRows();
    let selectedRowsArray: any[] = [];
    selectedRows.forEach((value, key) => {
      selectedRowsArray = [...selectedRowsArray, value];
    });

    setSelectedRows([row]);
    setDeleteModalOpened(true);
  };

  const handleDelete_multi = () => {
    let selectedRows = gridRef.current.getSelectedRows();
    let selectedRowsArray: any[] = [];
    selectedRows.forEach((value, key) => {
      selectedRowsArray = [...selectedRowsArray, value];
    });
    setSelectedRows(selectedRowsArray);
    setDeleteModalOpened(true);
  };

  function action_DeleteUser(rows: User_ManageTable[]){
    // Action functions are passed into action button of a modal
    console.log(JSON.stringify(rows));
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "user",
      headerName: "Name",
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
      headerName: "Role",
      minWidth: 150,
      flex: 3,
      valueGetter: (params: GridValueGetterParams) => {
        return params.row.roles
          .map((role: { id: Number; name: String }) => role.name)
          .join(", ");
      },
    },
    {
      field: "actions",
      headerName: "Action",
      minWidth: 130,
      flex: 3,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className="flex gap-2">
            <Button
              variant="filled"
              color="#6ED10A"
              className="w-24 py-1 text-sm font-semibold"
              onClick={(e) => handleEditUser(e, params.row)}
            >
              Edit
            </Button>
            <Button
              variant="filled"
              color="#CA3D3D"
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

  function CustomColumnMenu(props: GridColumnMenuProps) {
    return (
      <GridColumnMenu
        {...props}
        slots={{
          columnMenuColumnsItem: null,
        }}
      />
    );
  }

  function CustomFooterActions(
    props: NonNullable<GridSlotsComponentsProps["footer"]>,
  ) {
    return (
      <GridFooterContainer>
        <div className="flex gap-4 px-4">
          <Button
            variant="filled"
            color="#6ED10A"
            className="w-24 py-1 text-sm font-semibold"
            onClick={handleEdit_multi}
          >
            Edit Selected
          </Button>
          <Button
            variant="filled"
            color="#CA3D3D"
            className="w-24 py-1 text-sm font-semibold"
            onClick={handleDelete_multi}
          >
            Delete Selected
          </Button>
        </div>
        <GridFooter
          sx={{
            border: "none", // To delete double border.
            width: "100%",
          }}
        />
      </GridFooterContainer>
    );
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="flex h-fit flex-initial py-6">
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

      <div style={{ flex: "1 1 0%", minHeight: 0 }}>
        <StripedDataGrid
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
          slots={{ columnMenu: CustomColumnMenu, footer: CustomFooterActions }}
          getRowHeight={() => "auto"}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20, 50, 100]}
          checkboxSelection
          disableColumnFilter
          loading={tableIsLoading}
          apiRef={gridRef}
        />
      </div>

      <UserRolesModal
        opened={roleModalOpened}
        setOpen={setRoleModalOpened}
        targetRows={selectedRows}
      />
      <RemoveModal
        opened={deleteModalOpened}
        setOpen={setDeleteModalOpened}
        title="Delete users ?"
        messages={[
          "Are you sure you want to remove these user(s) from the system ?",
        ]}
        targetStrings={selectedRows.map(row => `[${row.id}] - ${row.name}`)}
        actionButtonTitle="Remove"
        actionFunction={action_DeleteUser}
        actionFuncParams={selectedRows}
      />
    </div>
  );
};

export default Users;
