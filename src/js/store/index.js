import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const configureStore = () => {
    const middlewares = [thunk];
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    // return createStore(combineReducers(reducers), composeEnhancers(applyMiddleware(...middlewares)));
    return createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)));
};

export default configureStore;