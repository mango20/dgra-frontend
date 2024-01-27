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
import { getReq } from "../../../../Service/API";
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
          setViewHousehold(row);
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
        handler: () => {
          console.log("Deleted");
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
