import { productReducer, categoryReducer, brandReducer, headerReducer } from './reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    productState: productReducer,
    categoryState: categoryReducer,
    brandState: brandReducer,
    headerState: headerReducer,
});

export default rootReducer;
