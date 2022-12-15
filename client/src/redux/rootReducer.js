import { productReducer, categoryReducer, brandReducer } from './reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    productState: productReducer,
    categoryState: categoryReducer,
    brandState: brandReducer,
});

export default rootReducer;
