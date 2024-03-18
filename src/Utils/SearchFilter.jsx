const deepSearch = (obj, term) => {
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      if (deepSearch(obj[key], term)) {
        return true;
      }
    } else if (typeof obj[key] === "string" || typeof obj[key] === "number") {
      if (String(obj[key]).toLowerCase().includes(term)) {
        return true;
      }
    }
  }
  return false;
};

const SearchFilter = (data, param) => {
  const searchTermLower = param.toLowerCase();

  return data?.filter((item) => deepSearch(item, searchTermLower));
};

export default SearchFilter;
