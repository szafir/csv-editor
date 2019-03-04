import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as actionTypes from "../actions/actionTypes";

const styles = theme => ({
  root: {
    display: "flex",
    margin: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px 0`
  },
  button: {
    marginRight: theme.spacing.unit * 2
  }
});

class Toolbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Button
          variant="contained"
          className={classes.button}
          onClick={this.props.addRow}
        >
          Add row
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          onClick={this.props.addColumn}
        >
          Add column
        </Button>
        <Button variant="contained" className={classes.button}>
          Import from CSV
        </Button>
        <Button variant="contained" className={classes.button}>
          Export to CSV
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addRow: () => dispatch({ type: actionTypes.ADD_ROW }),
  addColumn: () => dispatch({ type: actionTypes.ADD_COLUMN })
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Toolbar));
