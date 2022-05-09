const Reducer = (state, action) => {
  switch (action.type) {
    case "Login_Process_Started":
      return {
        user: null,
        isFetching: true,
        error: false,
      };

    case "Login_Successful":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };

    case "Login_Failed":
      return {
        user: null,
        isFetching: false,
        error: true,
      };

    case "Logout":
      return {
        user: null,
        isFetching: false,
        error: false,
      };

    default:
      return state;
  }
};

export default Reducer;
