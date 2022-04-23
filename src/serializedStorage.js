const serializedStorage = {
  STORAGE_KEY: "react_to_do_storage",

  fetch: function () {
    const data = localStorage.getItem(serializedStorage.STORAGE_KEY);
    return data || "";
  },

  save: function (data) {
    localStorage.setItem(serializedStorage.STORAGE_KEY, data);
  }
};

export default serializedStorage;
