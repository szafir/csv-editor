import React, { Component } from "react";
import { connect } from "react-redux";
import { Paper, Table } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Pagination from "../components/Pagination";
import Header from "../components/Table/Header";
import Body from "../components/Table/Body";
import * as actionTypes from "../actions/actionTypes";

const styles = () => ({
  root: {},
  tableWrapper: {
    overflowX: "auto",
    width: "100%",
  },
});

class CSVTable extends Component {
  onHeaderFocusHandler = (index) => {
    const { updateColumn } = this.props;
    updateColumn({
      editable: true,
      index,
    });
  };

  onHeaderChangeHandler = (index, editable) => (event) => {
    const { updateColumn } = this.props;
    updateColumn({
      editable,
      index,
      value: event.target.value,
    });
  };

  onRowFocusHandler = (rowIndex, colIndex) => {
    const { updateRow } = this.props;
    updateRow({
      editable: true,
      coordinates: [rowIndex, colIndex],
    });
  };

  onRowChangeHandler = (rowIndex, colIndex, editable) => (event) => {
    const { updateRow } = this.props;
    updateRow({
      editable,
      coordinates: [rowIndex, colIndex],
      value: event.target.value,
    });
  };

  handleColumnDeletion = index => (event) => {
    const { deleteColumn } = this.props;
    deleteColumn({
      index,
    });
    event.stopPropagation();
  };

  handleRowDeletion = index => (event) => {
    const { deleteRow } = this.props;
    deleteRow({
      index,
    });
    event.stopPropagation();
  };

  render() {
    const {
      classes,
      columns,
      rows,
      rowsIds,
      rowsPerPage,
      page,
      updateTableParams,
    } = this.props;
    return (
      <>
        {columns.length > 0 && (
          <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
              <Table>
                <Header
                  columns={columns}
                  onHeaderFocusHandler={this.onHeaderFocusHandler}
                  onHeaderChangeHandler={this.onHeaderChangeHandler}
                  onDelete={this.handleColumnDeletion}
                />
                <Body
                  rows={rows}
                  rowsIds={rowsIds}
                  onRowFocusHandler={this.onRowFocusHandler}
                  onRowChangeHandler={this.onRowChangeHandler}
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
              onParamsUpdate={updateTableParams}
            />
          </Paper>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  columns: state.table.columns,
  rows: state.table.rows,
  rowsIds: state.table.rowsIds,
  rowsPerPage: state.table.rowsPerPage,
  page: state.table.page,
});

const mapDispatchToProps = dispatch => ({
  updateColumn: payload => dispatch({ type: actionTypes.UPDATE_COLUMN, payload }),
  updateRow: payload => dispatch({ type: actionTypes.UPDATE_ROW, payload }),
  updateTableParams: payload => dispatch({ type: actionTypes.UPDATE_TABLE_PARAMS, payload }),
  deleteColumn: payload => dispatch({ type: actionTypes.DELETE_COLUMN, payload }),
  deleteRow: payload => dispatch({ type: actionTypes.DELETE_ROW, payload }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CSVTable));
