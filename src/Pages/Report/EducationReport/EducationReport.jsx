import React, { useState, useEffect } from "react";
import PageContainer from "../../../Layout/Container/PageContainer";
import CustomContainer from "../../../Layout/Container/CustomContainer";
import Card from "../../../Components/UI/Card/Card";
import Select from "../../../Components/Form/Select";
import landClassification from "../../../Data/landClassification.json";
import { getReq } from "../../../Service/API";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const EducationReport = () => {
  const [aggregatedData, setAggregatedData] = useState([]);
  const [totalCapacity, setTotalCapacity] = useState(0);
  const [totalEnrolled, setTotalEnrolled] = useState(0);
  const [selectedSchoolData, setSelectedSchoolData] = useState(null);
  const [educationInfo, setEducationInfo] = useState([]);
  const [listGrade, setListGrade] = useState([]);
  const fetchData = async () => {
    try {
      const response = await getReq("/api/financial/education");
      console.log(response.education);
      setEducationInfo(response.education);
      if (response.education) {
        const aggregatedData = response.education.map((school) => {
          const { name, category, purok, barangay, schoolYear, ...grades } =
            school;
          console.log(grades);
          setListGrade(grades);
          const { totalCapacity, totalEnrolled } = calculateTotals(grades);

          return {
            name,
            category,
            totalCapacity,
            totalEnrolled,
          };
        });

        setAggregatedData(aggregatedData);

        const totalCapacityAll = aggregatedData.reduce(
          (acc, school) => acc + school.totalCapacity,
          0
        );
        const totalEnrolledAll = aggregatedData.reduce(
          (acc, school) => acc + school.totalEnrolled,
          0
        );

        setTotalCapacity(totalCapacityAll);
        setTotalEnrolled(totalEnrolledAll);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateTotals = (grades) => {
    let totalEnrolled = 0;
    let totalCapacity = 0;

    for (let i = 1; i <= 12; i++) {
      const enrolledKey = `g${i}NumberOfEnrolled`;
      const capacityKey = `g${i}MaximumCapacity`;

      totalEnrolled += parseInt(grades[enrolledKey]) || 0;
      totalCapacity += parseInt(grades[capacityKey]) || 0;
    }

    return { totalEnrolled, totalCapacity };
  };

  const handleSchoolChange = (schoolName) => {
    console.log(schoolName);
    if (schoolName) {
      console.log("Received schoolName:", schoolName);
      const selectedSchool = educationInfo.find(
        (school) => school.name.toLowerCase() === schoolName.toLowerCase()
      );
      console.log(selectedSchool);
      if (selectedSchool) {
        setSelectedSchoolData(selectedSchool);
      } else {
        console.log(`School '${schoolName}' not found in educationInfo`);
      }
    } else {
      console.log("School name is undefined or null");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generateModifiedData = () => {
    const data = [];
    if (selectedSchoolData) {
      for (let i = 1; i <= 12; i++) {
        const gradeData = {
          name: `Grade ${i}`,
          enrolled: selectedSchoolData?.[`g${i}NumberOfEnrolled`] || 0,
          capacity: selectedSchoolData?.[`g${i}MaximumCapacity`] || 0,
          availableSlots:
            (selectedSchoolData?.[`g${i}MaximumCapacity`] || 0) -
            (selectedSchoolData?.[`g${i}NumberOfEnrolled`] || 0),
        };
        data.push(gradeData);
      }
    }
    console.log(data);
    return data;
  };

  const labels = ["Total Capacity", "Total Enrolled", "Total Number of School"];

  // console.log(modifiedData);
  console.log(educationInfo);
  console.log(selectedSchoolData);
  return (
    <PageContainer>
      <CustomContainer title={"Education"} className="reports">
        <Card
          data={[totalCapacity, totalEnrolled, aggregatedData.length]}
          label={labels}
          hasPeso={false}
          borderColors={["purple", "lightgreen", "lightblue"]}
        />
        <div className="reportContent">
          <Select
            label="Name of School"
            data={aggregatedData.map((school) => school.name)}
            className="selectReport"
            defaultOptionLabel="Select Name of School"
            onChange={(event) => handleSchoolChange(event.target.value)}
          />

          <div className="barchart">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={generateModifiedData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  stackId="a"
                  dataKey="capacity"
                  fill="#82ca9d"
                  name="Capacity"
                />
                <Bar
                  stackId="a"
                  dataKey="enrolled"
                  fill="#8884d8"
                  name="Enrolled"
                />
                <Bar
                  stackId="a"
                  dataKey="availableSlots"
                  fill="#ffc658"
                  name="Available Slots"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CustomContainer>
    </PageContainer>
  );
};

export default EducationReport;
