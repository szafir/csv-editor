
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import table from './reducers/table';
import thunk from "redux-thunk";
// import invariant from "redux-immutable-state-invariant";


const rootReducer = combineReducers({
  table
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk /*, invariant()*/))
);

export default store;