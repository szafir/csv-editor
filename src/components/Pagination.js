import React from "react";
import { TablePagination } from "@material-ui/core";

const Pagination = props => {
  const { rowsPerPage, count, page, onParamsUpdate } = props;
  const onChangePage = (event, page) => {
    onParamsUpdate({
      page
    });
  };
  const onChangeRowsPerPage = event => {
    onParamsUpdate({
      rowsPerPage: event.target.value
    });
  };
  return (
    <TablePagination
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangeRowsPerPage={onChangeRowsPerPage}
      onChangePage={onChangePage}
      component="div"
    />
  );
};

export default Pagination;
