import React, { Component } from "react";
import Pagination from "../components/Pagination";
import { connect } from "react-redux";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  // TablePagination,
  TableHead,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CSVHeader from "../components/CSVHeader";
import CSVBody from "../components/CSVBody";
import * as actionTypes from "../actions/actionTypes";

const styles = theme => ({
  root: {
    // overflowX: "hidden"
  },
  tableWrapper: {
    overflowX: "auto",
    width: "100%"
    // display: "table"
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
    this.props.updateColumn({
      editable,
      index,
      value: event.target.value
    });
  };

  startEditRowHandler = (rowIndex, colIndex, event) => {
    this.props.updateRow({
      editable: true,
      coordinates: [rowIndex, colIndex]
    });
  };
  handleInputRowBlur = (rowIndex, colIndex, editable, event) => {
    this.props.updateRow({
      editable,
      coordinates: [rowIndex, colIndex],
      value: event.target.value
    });
  };
  componentDidMount() {}

  handleColumnDeletion = (index, event) => {
    this.props.deleteColumn({
      index
    })
  };
  handleRowDeletion = (rowInd, colInd, event) => {
    this.props.deleteColumn({
      coordinates: [rowInd, colInd]
    })
    // console.log(rowInd, colInd);
  };
  render() {
    const {
      classes,
      columns,
      rows,
      visibleRows,
      rowsPerPage,
      page
    } = this.props;
    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table>
            <CSVHeader
              columns={columns}
              startEditHandler={this.startEditHandler}
              handleInputBlur={this.handleInputBlur}
              onDelete={this.handleColumnDeletion}
            />
            <CSVBody
              rows={visibleRows}
              startEditHandler={this.startEditRowHandler}
              handleInputBlur={this.handleInputRowBlur}
              rowsPerPage={rowsPerPage}
              page={page}
              onDelete={this.handleRowDeletion}
            />
          </Table>
        </div>
        <Pagination
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onParamsUpdate={this.props.updateTableParams}
        />
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  columns: state.table.columns,
  rows: state.table.rows,
  visibleRows: state.table.visibleRows,
  rowsPerPage: state.table.rowsPerPage,
  page: state.table.page
});

const mapDispatchToProps = dispatch => ({
  updateColumn: payload =>
    dispatch({ type: actionTypes.UPDATE_COLUMN, payload }),
  updateRow: payload => dispatch({ type: actionTypes.UPDATE_ROW, payload }),
  updateTableParams: payload =>
    dispatch({ type: actionTypes.UPDATE_TABLE_PARAMS, payload }),
  deleteColumn: payload =>
    dispatch({ type: actionTypes.DELETE_COLUMN, payload }),
  deleteRow: payload => dispatch({ type: actionTypes.DELETE_ROW, payload })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CSVTable));
