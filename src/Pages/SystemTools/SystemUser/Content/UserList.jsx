import React, { useEffect, useState } from "react";
import { userTC } from "../../../../Utils/TableColumns";
import SearchFilter from "../../../../Utils/SearchFilter";
import CustomTable from "../../../../Components/UI/Table/Table";
import {
  faLock,
  faPencil,
  faRotate,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { getReq, patchReq } from "../../../../Service/API";
import { useDispatch } from "react-redux";
import { userListGetSuccess } from "../../../../Service/Action/UserListSlice";

const UserList = ({ searchTerm, onEdit, onItemAddedOrUpdated, alertMsg }) => {
  const tableColumns = userTC;
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);

  const restoreUser = async (userId) => {
    try {
      const response = await patchReq("/api/system-tools/systemTools/restore", {
        _id: userId,
      });

      console.log(response);
      alertMsg(response.message);
      onItemAddedOrUpdated();
    } catch (error) {
      console.log("Error Restoring User", error);
    }
  };

  const disableUser = async (userId) => {
    console.log("click");
    try {
      const response = await patchReq("/api/system-tools/systemTools/update", {
        _id: userId,
        access: "Disabled",
      });

      alertMsg(response.message);
      onItemAddedOrUpdated();
    } catch (error) {
      console.log("Error Disabling User", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await patchReq("/api/system-tools/systemTools", {
        _id: userId,
      });

      console.log(response);
      alertMsg(response.message);
      onItemAddedOrUpdated();
    } catch (error) {
      console.log("Error Deleting User", error);
    }
  };

  const getActionsForRow = (row) => {
    const actions = [];

    if (row.status === "Deleted") {
      actions.push({
        label: "Restore",
        icon: faRotate,
        handler: () => restoreUser(row._id),
      });
    } else {
      actions.push({
        label: "Edit",
        icon: faPencil,
        handler: () => {
          onEdit(row);
        },
      });

      actions.push({
        label: "Disable Access",
        icon: faLock,
        handler: () => {
          disableUser(row._id);
        },
      });

      actions.push({
        label: "Delete",
        icon: faTrash,
        handler: () => deleteUser(row._id),
      });
    }

    return actions;
  };

  useEffect(() => {
    getUser();
  }, [onItemAddedOrUpdated]);

  const getUser = async () => {
    try {
      const response = await getReq("/api/system-tools/systemTools/getAll");
      console.log("System User : ", response.systemUser);
      dispatch(userListGetSuccess(response.systemUser));
      setUser(response.systemUser);
    } catch (error) {
      console.log("Error Get User", error);
    }
  };

  const dataFiltered = SearchFilter(user, searchTerm);

  return (
    <div>
      <CustomTable
        data={dataFiltered}
        columns={tableColumns}
        getActions={getActionsForRow}
        itemsPerPage={5}
      />
    </div>
  );
};

export default UserList;
