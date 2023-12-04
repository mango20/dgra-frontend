export const handleLogout = (navigate) => {
  localStorage.clear();
  navigate("/");
};

export const handleEducation = (navigate) => {
  navigate("/education");
};

const menu = [
  {
    label: "Barangay Profile",
    subLabel: ["About Barangay", "Calendar of Events"],
  },
  {
    label: "Resident Profile",
    subLabel: ["Household", "Household Members"],
  },
  {
    label: "Disaster Admin",
    subLabel: [
      "Advisory",
      "Safety Tips",
      "Preparedness Kit",
      "BDRRMC Team",
      "Evacuation Center",
      "BDRRMC Team Members",
    ],
  },
  {
    label: "Financial",
    subLabel: ["Budget", "Supplies", "Equipment"],
  },
  {
    label: "Education",
    onClick: handleEducation,
    route: "/education",
  },
  {
    label: "Report",
    subLabel: [
      "Barangay Profile Report",
      "Financial Report",
      "Education Report",
      "Disaster-related Job Report",
    ],
  },
  {
    label: "Forecast",
    subLabel: ["Risk Area", "Relief", "Disaster Fund", "Evacuation Center"],
  },
  {
    label: "System Tools",
    subLabel: ["Change Password", "System Users", "Request Change Password"],
  },
  {
    label: "Logout",
    onClick: handleLogout,
  },
];

export default menu;
