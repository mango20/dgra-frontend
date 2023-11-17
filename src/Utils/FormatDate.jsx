export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Adjust the date formatting as needed
};
