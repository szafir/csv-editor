import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as actionTypes from "../actions/actionTypes";
import * as actions from "../actions";
import { stat } from "fs";
import Download from "../components/Download";

const styles = theme => ({
  root: {
    display: "flex",
    margin: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px 0`
  },
  button: {
    marginRight: theme.spacing.unit * 2
  },
  fileInput: {
    display: "none"
  }
});

class Toolbar extends Component {
  onFileSelect = event => {
    this.props.processCSV({
      file: event.target.files[0]
    });
  };
  handleDownloadCSV = () => {
    const { downloadCSV } = this.props;
    downloadCSV();
  };
  render() {
    const { classes } = this.props;
    const disabled = this.props.columns.length === 0;

    return (
      <div className={classes.root}>
        <Button
          variant="contained"
          disabled={disabled}
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
        <input
          className={classes.fileInput}
          id="import-csv"
          multiple
          type="file"
          onChange={this.onFileSelect}
        />
        <label htmlFor="import-csv">
          <Button
            variant="contained"
            component="span"
            className={classes.button}
          >
            Import from CSV
          </Button>
        </label>
        <Button
          variant="contained"
          className={classes.button}
          onClick={this.handleDownloadCSV}
        >
          Export to CSV
        </Button>
        <Download
          downloadContent={this.props.downloadContent}
          clearDownload={this.props.clearDownload}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rows: state.table.rows,
  columns: state.table.columns,
  downloadContent: state.table.downloadContent
});

const mapDispatchToProps = dispatch => ({
  addRow: () => dispatch({ type: actionTypes.ADD_ROW }),
  addColumn: () => dispatch({ type: actionTypes.ADD_COLUMN }),
  processCSV: payload => dispatch(actions.processCSV(payload)),
  downloadCSV: () => dispatch({ type: actionTypes.DOWNLOAD_CSV }),
  clearDownload: () => dispatch({ type: actionTypes.CLEAR_DOWNLOAD })
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Toolbar));
