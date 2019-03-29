import React from "react";
import CSVRow from "./Row";
import { TableBody } from "@material-ui/core";

const Body = props => {
  const { rows, rowsIds, page, rowsPerPage, onDelete } = props;
  const visibleRows = rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  const visibleRowsIds = rowsIds.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );
  return (
    <TableBody>
      {visibleRows &&
        visibleRows.map((item, index) => {
          return (
            <CSVRow
              row={item}
              onRowFocusHandler={props.onRowFocusHandler}
              onRowChangeHandler={props.onRowChangeHandler}
              index={index}
              key={visibleRowsIds[index]}
              rowsPerPage={rowsPerPage}
              onDelete={onDelete}
              page={page}
            />
          );
        })}
    </TableBody>
  );
};

export default Body;
