import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import rootReducer from './rootReducer';

const middkewares = [reduxThunk];

if (process.env.NODE_ENV === 'development') {
    middkewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middkewares));

export default store;
