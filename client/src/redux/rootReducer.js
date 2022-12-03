import { productReducer } from './reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    productState: productReducer,
});

export default rootReducer;
