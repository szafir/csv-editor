import * as actionTypes from "../actions/actionTypes";

const initState = () => {
  const initialState = {
    columns: [
      { value: "column1" },
      { value: "column2" },

    ],
    rows: [
      [
        { value: "row11" },
        { value: "row12" },

      ],
      [
        { value: "row21" },
        { value: "row22" },

      ]
    ],
    visibleRows: [
      [
        { value: "row11" },
        { value: "row12" },
        { value: "row13" },
        { value: "row14" }
      ],
      [
        { value: "row21" },
        { value: "row22" },
        { value: "row23" },
        { value: "row24" }
      ]
    ],
    page: 1,
    pageSize: 30
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
  const rows = [...state.rows];
  const row = state.columns.map(item => ({ value: "" }));
  rows.unshift(row);
  return {
    ...state,
    rows
  };
};

const updateTableParams = (state, action) => {
  const { page = 1, pageSize = 30 } = action.payload;
  return {
    ...state,
    page,
    pageSize
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
    default:
      return state;
  }
};
export default reducer;
