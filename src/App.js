import React, { Component } from "react";
import Toolbar from "./containers/Toolbar";
import CSVTable from "./containers/CSVTable";
import Header from "./components/Header";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: 1280,
    margin: "0px auto"
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <>
        <Header />
        <div className={classes.root}>
          <Toolbar />
          <CSVTable />
        </div>
      </>
    );
  }
}

export default withStyles(styles)(App);
