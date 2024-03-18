import React, { useEffect, useState } from "react";
import {
  faEye,
  faPencil,
  faPlus,
  faRotate,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Householdmember from "../../../../Data/SampleData/Householdmember.json";
import SearchFilter from "../../../../Utils/SearchFilter";
import CustomTable from "../../../../Components/UI/Table/Table";
import { householdMemberTC } from "../../../../Utils/TableColumns";
import { getReq } from "../../../../Service/API";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const HouseholdMemberList = ({ searchTerm }) => {
  const [isAddHouseholdMemberModalOpen, setAddHouseholdMemberModalOpen] =
    useState(false);
  const [householdmember, setHouseholdMembers] = useState(null);

  const closeModal = () => {
    setAddHouseholdMemberModalOpen(false);
  };

  const tableColumns = householdMemberTC;

  const getActionsForRow = (row) => {
    const actions = [];

    if (row.status === "Deleted") {
      actions.push({
        label: "Restore",
        icon: faRotate, // Add your specific icon here
        handler: () => {
          // Your restore logic goes here
        },
      });
    } else {
      actions.push({
        label: "Edit Household",
        icon: faPencil,
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
    }

    return actions;
  };

  useEffect(() => {
    getMember();
  }, []);

  const location = useLocation();
  const houseHoldMemberId = location.state;
  // const userId = useSelector((state) => state.reducer.userInfo.userInfo._id);
  // console.log(userId);
  const [householdMembersListData, setHouseholdMembersListData] =
    useState(null);
  const getMember = async () => {
    try {
      const response = await getReq("/api/getHouseholdMember");
      const userMembers = response?.householdMember?.filter(
        (member) => member.userId === houseHoldMemberId
      );

      setHouseholdMembersListData(userMembers);
      // console.log("userMembers: ", userMembers);

      // setHouseholdMembers(response.calendarOfEvents);
    } catch (error) {
      console.log("Error Getting Events", error);
    }
  };

  const dataFiltered = SearchFilter(householdMembersListData, searchTerm);

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

export default HouseholdMemberList;
