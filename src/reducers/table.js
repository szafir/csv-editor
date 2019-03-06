import * as actionTypes from "../actions/actionTypes";

import Papa from "papaparse";

const initState = () => {
  const initialState = {
    columns: [],
    rows: [],
    visibleRows: [],
    page: 0,
    rowsPerPage: 10,
    downloadContent: false
  };
  return initialState;
};

const initialState = initState();

const addColumn = (state, action) => {
  const columns = [...state.columns];
  columns.push({ name: "" });
  const rows = state.rows.map(row => {
    row.push({ value: "" });
    return row;
  });
  return {
    ...state,
    columns,
    rows
  };
};

const addRow = (state, action) => {
  const { page, rowsPerPage } = state;
  const rows = [...state.rows];
  const row = state.columns.map(item => ({ value: "" }));

  rows.splice(page * rowsPerPage, 0, row);
  const visibleRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return {
    ...state,
    rows,
    visibleRows
  };
};

const updateTableParams = (state, action) => {
  const { page = state.page, rowsPerPage = state.rowsPerPage } = action.payload;
  const visibleRows = state.rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return {
    ...state,
    page,
    rowsPerPage,
    visibleRows
  };
};

const updateColumn = (state, action) => {
  const { editable = false, value = false, index } = action.payload;
  const columns = [...state.columns];
  columns[index] = {
    editable,
    value: value === false ? state.columns[index].value : value
  };
  return {
    ...state,
    columns
  };
};

const updateRow = (state, action) => {
  const { editable, coordinates, value = false } = action.payload;
  const { page, rowsPerPage } = state;
  const coordinateX = page * rowsPerPage + coordinates[0];
  const coordinateY = coordinates[1];
  const rows = state.rows.map(row => row.map(item => ({ ...item })));
  rows[coordinateX][coordinateY].editable = editable;
  rows[coordinateX][coordinateY].value =
    value === false ? rows[coordinateX][coordinateY].value : value;
  const visibleRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return {
    ...state,
    rows,
    visibleRows
  };
};

const deleteColumn = (state, action) => {
  const { index } = action.payload;
  const columns = [...state.columns];
  const { page, rowsPerPage } = state;
  let rows = [];
  if (state.rows.length > 0 && state.rows[0].length > 1) {
    rows = state.rows.map(row => {
      const rw = [...row];
      rw.splice(index, 1);
      return rw;
    });
  }
  columns.splice(index, 1);
  const visibleRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return {
    ...state,
    columns,
    rows,
    visibleRows
  };
};

const deleteRow = (state, action) => {
  const { index } = action.payload;
  const { page, rowsPerPage } = state;
  const rows = state.rows.map(row => row.map(item => ({ ...item })));
  rows.splice(page * rowsPerPage + index, 1);
  const visibleRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return {
    ...state,
    rows,
    visibleRows
  };
};

const processCSV = (state, action) => {
  const { data } = action.payload;
  const { page, rowsPerPage } = state;
  const columns = data[0].map(col => ({ value: col }));
  data.splice(0, 1);
  const rows = data.map(row => row.map(item => ({ value: item })));
  const visibleRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return {
    ...state,
    columns,
    rows,
    visibleRows
  };
};

const downloadCSV = (state, action) => {
  const { rows, columns } = state;
  const csvData = [columns.map(item => item.value)].concat(
    rows.map(row => row.map(item => item.value))
  );
  const csv = Papa.unparse(csvData);
  return {
    ...state,
    downloadContent: csv
  };
};

const clearDownload = state => {
  return {
    ...state,
    downloadContent: false
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_COLUMN:
      return addColumn(state, action);
    case actionTypes.ADD_ROW:
      return addRow(state, action);
    case actionTypes.UPDATE_TABLE_PARAMS:
      return updateTableParams(state, action);
    case actionTypes.UPDATE_COLUMN:
      return updateColumn(state, action);
    case actionTypes.UPDATE_ROW:
      return updateRow(state, action);
    case actionTypes.UPDATE_TABLE_PARAMS:
      return updateTableParams(state, action);
    case actionTypes.DELETE_COLUMN:
      return deleteColumn(state, action);
    case actionTypes.DELETE_ROW:
      return deleteRow(state, action);
    case actionTypes.PROCESS_CSV:
      return processCSV(state, action);
    case actionTypes.DOWNLOAD_CSV:
      return downloadCSV(state, action);
    case actionTypes.CLEAR_DOWNLOAD:
      return clearDownload(state, action);
    default:
      return state;
  }
};
export default reducer;
