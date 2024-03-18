import React, { useEffect, useState } from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import CustomContainer from "../../../Layout/Container/CustomContainer";
import Card from "../../../Components/UI/Card/Card";
import Select from "../../../Components/Form/Select";
import { d10Item } from "../../../Data/JsData/surveyItems";
import { Pie, PieChart, Cell, Tooltip, Legend } from "recharts";
import { getReq } from "../../../Service/API";

const Relief = () => {
  const [selectedRelief, setSelectedRelief] = useState(null);
  const [reliefData, setReliefData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [householdTotal, setHouseholdDataTotal] = useState(null);

  const labels = [
    "Household with Preparednes Kit",
    "Household without Preparednes Kit",
  ];

  const handleReliefSelect = (selectedOption) => {
    setSelectedRelief(selectedOption);
    const newData = fetchDataBasedOnDisaster(selectedOption.target.value);
    setPieChartData(newData);
  };

  const fetchDataBasedOnDisaster = (selectedRelief) => {
    if (!reliefData) return [];

    const reliefDataKeys = {
      Water: "water",
      "Food (canned goods, biscuits, bread)": [
        { name: "Rice", valueKey: "rice" },
        { name: "Noodles", valueKey: "noodles" },
        { name: "Coffee", valueKey: "coffee" },
        { name: "Canned Food", valueKey: "cannedFood" },
      ],
      "Matches/Lighter": "matches",
      "Flashlight/Emergency Light": "flashlight",
      "Candle ": "candle",
      Whistle: "whistle",
    };

    let data = [];
    if (Array.isArray(reliefDataKeys[selectedRelief])) {
      reliefDataKeys[selectedRelief].forEach((item) => {
        data.push({
          name: item.name,
          value: reliefData[item.valueKey],
        });
      });
    } else {
      data.push({
        name: selectedRelief,
        value: reliefData[reliefDataKeys[selectedRelief]],
      });
    }

    return data;
  };

  const getRelief = async () => {
    try {
      const response = await getReq("/api/typeOfrelief");
      setHouseholdDataTotal([
        response.householdWitPreparednessKit,
        response.householdWithoutPreparednessKit,
      ]);
      setReliefData(response);
    } catch (error) {}
  };

  useEffect(() => {
    getRelief();
  }, []);

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <PageContainer>
      <CustomContainer title={"Relief"} className="reports">
        <Card
          data={householdTotal}
          label={labels}
          hasPeso={false}
          borderColors={["purple", "lightgreen"]}
        />
        <div className="reportContent">
          <Select
            label="Type of Relief"
            data={d10Item}
            className="selectReport"
            defaultOptionLabel="Select Type of Relief"
            onChange={(value) => handleReliefSelect(value)}
          />
          {selectedRelief && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              {Array.isArray(pieChartData) &&
              pieChartData.length > 0 &&
              !pieChartData.some((entry) => entry.value === undefined) ? (
                <PieChart width={350} height={350}>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#82ca9d"
                    label
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                    <Tooltip />
                  </Pie>
                  <Legend
                    align="center"
                    iconType="circle"
                    layout="horizontal"
                    verticalAlign="bottom"
                    height={36}
                  />
                </PieChart>
              ) : (
                <p style={{ marginTop: "30px" }}>No data available</p>
              )}
            </div>
          )}
        </div>
      </CustomContainer>
    </PageContainer>
  );
};

export default Relief;
