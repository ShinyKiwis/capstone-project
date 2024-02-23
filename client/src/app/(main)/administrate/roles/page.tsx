"use client";
import React, { SyntheticEvent, useContext, useState } from "react";
import { ModalContext } from "@/app/providers/ModalProvider";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Button, Profile, SearchBox } from "@/app/_components";
import { Box, Modal, Typography } from "@mui/material";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import style from "styled-jsx/style";
import { useRole } from "@/app/hooks";


const RolesAdministrate = () => {
  const {roles} = useRole();

  const modalContextValue = useContext(ModalContext);
  if (!modalContextValue) {
    console.error("Modal context initialization failed !");
    return null;
  }
  const { toggleModal, setModalType, setModalProps } = modalContextValue;

  const handleEditRole = (e: SyntheticEvent, row: any) => {
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

  const handleDeleteRole = (e: SyntheticEvent, row: any) => {
    // alert("Delete:" + uid);
    e.stopPropagation();
    console.log("e object:", e);
    setModalType('status_warning');
    setModalProps({
      title: "Deleting a role !",
      messages: ["Are you sure you want to remove this user ?", "This action cannot be undone !"]
    })
    toggleModal(true);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Role ID",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Role Name",
      minWidth: 250,
      flex: 2
    },
    { field: "resources", headerName: "Resources", minWidth: 150, flex: 3 },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 130,
      flex: 3,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className="flex gap-2">
            <Button isPrimary={true} variant="success" className="w-24 py-1 text-sm font-semibold" onClick={(e) => handleEditRole(e, params.row)}>Edit</Button>
            <Button isPrimary={true} variant="danger"  className="w-24 py-1 text-sm font-semibold" onClick={(e) => handleDeleteRole(e, params.id)}>Delete</Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="flex h-fit w-full py-6 gap-4">
        <Button isPrimary={true} variant="normal" className="px-2 py-1">Create role</Button>
        <Button isPrimary={true} variant="normal" className="px-2 py-1">Edit roles</Button>
      </div>

      <div style={{ flex: "1 1 0%", minHeight: 0, width: "100%" }}>
        <DataGrid
          rows={roles}
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
        />
      </div>
    </div>
  );
};

export default RolesAdministrate;
