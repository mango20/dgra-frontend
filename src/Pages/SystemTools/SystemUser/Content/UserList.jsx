import React, { useEffect, useState } from "react";
import { userTC } from "../../../../Utils/TableColumns";
import SearchFilter from "../../../../Utils/SearchFilter";
import CustomTable from "../../../../Components/UI/Table/Table";
// import User from "../../../../Data/SampleData/User.json";
import { faLock, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { getReq } from "../../../../Service/API";
import { useDispatch } from "react-redux";
import { userListGetSuccess } from "../../../../Service/Action/UserListSlice";

const UserList = ({ searchTerm }) => {
  const tableColumns = userTC;
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);

  const getActionsForRow = (row) => {
    const actions = [];

    actions.push({
      label: "Edit",
      icon: faPencil,
      handler: () => {
        // Implement your edit logic here
      },
    });

    actions.push({
      label: "Disable Access",
      icon: faLock,
      handler: () => {
        // Implement your edit logic here
      },
    });

    actions.push({
      label: "Delete",
      icon: faTrash,
      handler: () => {
        console.log("Deleted");
      },
    });

    return actions;
  };

  useEffect(() => {
    getUser();
  }, []);

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
