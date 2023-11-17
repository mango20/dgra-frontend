export const generateFullName = (user) => {
  return `${user.firstname.trim()}${
    user.middlename.trim() ? ` ${user.middlename.trim()}` : ""
  } ${user.lastname.trim()}`;
};
