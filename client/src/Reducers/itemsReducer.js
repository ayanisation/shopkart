const itemsReducer = (items = [], action) => {
  switch (action.type) {
    case "FETCH_POSTS":
      return action.payload;
    case "CREATE_POST":
      return [...items, action.payload];
    case "UPDATE_POST":
      return items.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case "DELETE_POST":
      return items.filter((post) => post._id !== action.payload);
    default:
      return items;
  }
};
export default itemsReducer;
