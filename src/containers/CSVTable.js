import React, { Component } from "react";
// import TablePagination from '../components/TablePagination';
import { connect } from "react-redux";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  TablePagination,
  TableHead,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CSVHeader from "../components/CSVHeader";
import CSVBody from "../components/CSVBody";
import * as actionTypes from "../actions/actionTypes";

const styles = theme => ({
  root: {
    overflowX: "hidden"
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class CSVTable extends Component {
  startEditHandler = (index, event) => {
    this.props.updateColumn({
      editable: true,
      index
    });
  };
  handleInputBlur = (index, editable, event) => {
    console.log(index);
    console.log(event.target.value);
    console.log("blur");
    this.props.updateColumn({
      editable,
      index,
      value: event.target.value
    });
  };

  render() {
    const { classes, columns, rows } = this.props;

    return (
      <Paper className={classes.root}>
        <Table>
          <div classes={classes.tableWrapper}>
            <CSVHeader
              columns={columns}
              startEditHandler={this.startEditHandler}
              handleInputBlur={this.handleInputBlur}
            />
            <CSVBody
              rows={rows}
              startEditHandler={this.startEditRowHandler}
              handleInputBlur={this.handleInputRowBlur}
            />
          </div>
          <TableFooter>
            <TableRow>
              <TablePagination />
            </TableRow>
          </TableFooter>
        </Table>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  columns: state.table.columns,
  rows: state.table.rows
});

const mapDispatchToProps = dispatch => ({
  updateColumn: payload =>
    dispatch({ type: actionTypes.UPDATE_COLUMN, payload })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CSVTable));
