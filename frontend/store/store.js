//ext
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";
//int
import rootReducer from "../reducers/root_reducer";

export default (preloadedState = {}) =>
    createStore(
        rootReducer,
        preloadedState,
        // composeWithDevTools(applyMiddleware(ReduxThunk, logger))
        composeWithDevTools(applyMiddleware(ReduxThunk))
    );
