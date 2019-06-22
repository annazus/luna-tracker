import React, { useContext } from "react";
import Toolbar from "../Toolbar";
import classes from "./Layout.module.css";
import SymptomsContext from "../../SymptomsContext";
import { showSideBar, hideSideBar } from "../../actions";
import SideBar from "../SideBar";
const Layout = ({ children }) => {
  const { state, dispatch } = useContext(SymptomsContext);

  return (
    <>
      <Toolbar
        isAuthenticated={state.isAuth}
        showSideBarHandler={() => {
          dispatch(showSideBar());
        }}
      />
      {state.sideBarIsVisible ? (
        <SideBar
          hideSideBarHandler={() => dispatch(hideSideBar())}
          isAuthenticated={state.isAuth}
        />
      ) : null}
      <main className={classes.Content}>{children}</main>
    </>
  );
};
export { Layout as default };
