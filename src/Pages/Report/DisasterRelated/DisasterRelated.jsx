import React, { useEffect, useState } from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import CustomContainer from "../../../Layout/Container/CustomContainer";
import Card from "../../../Components/UI/Card/Card";
import Select from "../../../Components/Form/Select";
import report from "../../../Data/SampleData/report.json";

import landClassification from "../../../Data/landClassification.json";
import { getReq } from "../../../Service/API";
const DisasterRelated = () => {
  const labels = ["Top Population", "Total Household", "Household At Risk"];

  const [householdAtRisk, setHouseholdAtRisk] = useState(null);

  const getHouseholdAtRisk = async () => {
    try {
      const response = await getReq("/api/typeOfrelief");
      setHouseholdAtRisk([70, 60, response.householdAtRisk]);
    } catch (error) {}
  };

  useEffect(() => {
    getHouseholdAtRisk();
  }, []);

  return (
    <PageContainer>
      <CustomContainer title={"Disaster Related Job"} className="reports">
        <Card
          data={householdAtRisk}
          label={labels}
          hasPeso={false}
          borderColors={["purple", "lightgreen", "lightblue"]}
        />
        {/* <div className="reportContent">
          <Select
            label="Name of School"
            data={landClassification}
            className="selectReport"
            defaultOptionLabel="Select Name of School"
          />
        </div> */}
      </CustomContainer>
    </PageContainer>
  );
};

export default DisasterRelated;
