import React, { Fragment } from "react";
import "./App.css";
import Feed from "./component/Feed";

function App() {
  return (
    <Fragment>
      <div className="container">
        <div className="sidebar">
          <div className="sidebar-fixed"></div>
        </div>
        <div className="feed">
          <Feed />
        </div>
        <div className="widget">
          <div className="sidebar-fixed"></div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
