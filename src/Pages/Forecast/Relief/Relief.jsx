import React from "react";
import landClassification from "../../../Data/landClassification.json";
import report2 from "../../../Data/SampleData/report2.json";
import PageContainer from "../../../Layout/Container/PageContainer";
import CustomContainer from "../../../Layout/Container/CustomContainer";
import Card from "../../../Components/UI/Card/Card";
import Select from "../../../Components/Form/Select";
const Relief = () => {
  const labels = [
    "Household with Preparednes Kit",
    "Household without Preparednes Kit",
  ];
  return (
    <PageContainer>
      <CustomContainer title={"Relief"} className="reports">
        <Card
          data={report2}
          label={labels}
          hasPeso={false}
          borderColors={["purple", "lightgreen"]}
        />
        <div className="reportContent">
          <Select
            label="Type of Relief"
            data={landClassification}
            className="selectReport"
            defaultOptionLabel="Select Type of Relief"
          />
        </div>
      </CustomContainer>
    </PageContainer>
  );
};

export default Relief;
