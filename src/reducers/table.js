import Papa from "papaparse";
import v4 from "uuid";
import * as actionTypes from "../actions/actionTypes";

const initState = () => {
  const initialState = {
    columns: [],
    rows: [],
    rowsIds: [],
    page: 0,
    rowsPerPage: 10,
    downloadContent: false,
  };
  return initialState;
};

const initialState = initState();

const addColumn = (state) => {
  const columns = [...state.columns];
  columns.push({ name: "", id: v4() });
  const rows = state.rows.map((row) => {
    row.push({ value: "", id: v4() });
    return row;
  });
  return {
    ...state,
    columns,
    rows,
  };
};

const addRow = (state) => {
  const { page, rowsPerPage } = state;
  const rows = [...state.rows];
  const row = state.columns.map(() => ({ value: "", id: v4() }));
  const rowsIds = [...state.rowsIds];

  rows.splice(page * rowsPerPage, 0, row);
  rowsIds.splice(page * rowsPerPage, 0, v4());
  return {
    ...state,
    rows,
    rowsIds,
  };
};

const updateTableParams = (state, action) => {
  const { page = state.page, rowsPerPage = state.rowsPerPage } = action.payload;
  return {
    ...state,
    page,
    rowsPerPage,
  };
};

const updateColumn = (state, action) => {
  const { editable = false, value = false, index } = action.payload;
  const columns = [...state.columns];
  columns[index] = {
    editable,
    value: value === false ? state.columns[index].value : value,
  };
  return {
    ...state,
    columns,
  };
};

const updateRow = (state, action) => {
  const { editable, coordinates, value = false } = action.payload;
  const { page, rowsPerPage } = state;
  const cX = page * rowsPerPage + coordinates[0];
  const cY = coordinates[1];
  const rows = state.rows.map(row => row.map(item => ({ ...item })));
  rows[cX][cY].editable = editable;
  rows[cX][cY].value = value === false ? rows[cX][cY].value : value;
  return {
    ...state,
    rows,
  };
};

const deleteColumn = (state, action) => {
  const { index } = action.payload;
  const columns = [...state.columns];
  let rows = [];
  if (state.rows.length > 0 && state.rows[0].length > 1) {
    rows = state.rows.map((row) => {
      const rw = [...row];
      rw.splice(index, 1);
      return rw;
    });
  }
  columns.splice(index, 1);
  return {
    ...state,
    columns,
    rows,
  };
};

const deleteRow = (state, action) => {
  const { index } = action.payload;
  const { page, rowsPerPage } = state;
  const rows = state.rows.map(row => row.map(item => ({ ...item })));
  const rowsIds = [...state.rowsIds];
  rows.splice(page * rowsPerPage + index, 1);

  rowsIds.splice(page * rowsPerPage + index, 1);

  return {
    ...state,
    rows,
    rowsIds,
  };
};

const processCSV = (state, action) => {
  const { data } = action.payload;
  const columns = data[0].map(col => ({ value: col, id: v4() }));
  const rowsIds = [];
  data.splice(0, 1);
  const rows = data.map((row, index) => {
    rowsIds[index] = v4();
    return row.map(item => ({ value: item }));
  });
  return {
    ...state,
    columns,
    rows,
    rowsIds,
  };
};

const downloadCSV = (state) => {
  const { rows, columns } = state;
  const csvData = [columns.map(item => item.value)].concat(
    rows.map(row => row.map(item => item.value)),
  );
  const csv = Papa.unparse(csvData);
  return {
    ...state,
    downloadContent: csv,
  };
};

const clearDownload = state => ({
  ...state,
  downloadContent: false,
});

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
