const actionTypes = {
  SHOW_SIDEBAR: "SHOW_SIDEBAR",
  HIDE_SIDEBAR: "HIDE_SIDEBAR"
};

const showSideBar = () => {
  return {
    type: actionTypes.SHOW_SIDEBAR
  };
};

const hideSideBar = () => {
  return {
    type: actionTypes.HIDE_SIDEBAR
  };
};

export { actionTypes, showSideBar, hideSideBar };
