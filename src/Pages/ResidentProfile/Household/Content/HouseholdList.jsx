import React, { useEffect, useState } from "react";
import {
  faEye,
  faPencil,
  faPlus,
  faRotate,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
// import Households from "../../../../Data/SampleData/Households.json";
import { householdTC } from "../../../../Utils/TableColumns";
import SearchFilter from "../../../../Utils/SearchFilter";
import CustomTable from "../../../../Components/UI/Table/Table";
import AddHouseholdMember from "./Action/AddHouseholdMember";
import { deleteReq, getReq, putReq } from "../../../../Service/API";
import AddSurvey from "./Action/AddSurvey";
import { useNavigate } from "react-router-dom";

const HouseholdList = ({
  searchTerm,
  onEdit,
  onItemAddedOrUpdated,
  alertMsg,
  setAddHousehold,
  onView,
}) => {
  const navigate = useNavigate();
  const [isAddHouseholdMemberModalOpen, setAddHouseholdMemberModalOpen] =
    useState(false);

  const [isAddSurveyOpen, setIsAddSurveyOpen] = useState(false);
  const [households, setHouseholds] = useState([]);
  const [viewHousehold, setViewHousehold] = useState(null);

  const closeModal = () => {
    setAddHouseholdMemberModalOpen(false);
    setIsAddSurveyOpen(false);
  };

  const tableColumns = householdTC;

  const getActionsForRow = (row) => {
    const actions = [];

    if (row.status === "Inactive") {
      actions.push({
        label: "Restore",
        icon: faRotate, // Add your specific icon here
        handler: () => {
          console.log(row);
          restoreHousehold(row._id);
          // Your restore logic goes here
        },
      });
    } else {
      actions.push({
        label: "Add Household Member",
        icon: faPlus,
        handler: () => {
          setAddHouseholdMemberModalOpen(true);
        },
      });

      actions.push({
        label: "Add Survey",
        icon: faPlus,
        handler: () => {
          console.log(row);
          navigate(`/resident-profile/household/add-survey/${row._id}`, {
            state: row,
          });
          // setIsAddSurveyOpen(true);
        },
      });

      actions.push({
        label: "View Household",
        icon: faEye,
        handler: () => {
          onView(row);
        },
      });

      actions.push({
        label: "View Household Member",
        icon: faEye,
        handler: () => {
          console.log(row);
          // setViewHousehold(row);

          navigate(`/resident-profile/household-members`, {
            state: row._id,
          });
        },
      });

      actions.push({
        label: "Edit Household",
        icon: faPencil,
        handler: () => {
          onEdit(row);
        },
      });

      actions.push({
        label: "Delete Household",
        icon: faTrash,
        handler: async () => {
          console.log("Deleted", row);
          try {
            const response = await deleteReq(`/api/household?_id=${row._id}`);

            console.log(response);
            alertMsg(response.message);
            onItemAddedOrUpdated();
          } catch (error) {
            console.log("Error Deleting User", error);
          }
        },
      });
    }

    return actions;
  };

  useEffect(() => {
    getHouseholdList();
  }, [onItemAddedOrUpdated]);

  const getHouseholdList = async () => {
    try {
      const response = await getReq("/api/household");
      console.log("Budget : ", response);
      setHouseholds(response.household);
    } catch (error) {
      console.log("Error Get User", error);
    }
  };

  const restoreHousehold = async (id) => {
    try {
      const response = await putReq(`/api/household`, {
        _id: id,
      });

      console.log(response);
      alertMsg(response.message);
      onItemAddedOrUpdated();
    } catch (error) {
      console.log("Error Restoring User", error);
    }
  };

  const dataFiltered = SearchFilter(households, searchTerm);
  console.log(viewHousehold);
  return (
    <div>
      <CustomTable
        data={dataFiltered}
        columns={tableColumns}
        getActions={getActionsForRow}
        itemsPerPage={5}
      />
      <AddHouseholdMember
        household={viewHousehold}
        addHouseholdMember={isAddHouseholdMemberModalOpen}
        closeModal={closeModal}
      />
      {/* <AddSurvey isAddSurveyOpen={isAddSurveyOpen} closeModal={closeModal} /> */}
    </div>
  );
};

export default HouseholdList;
