import { productReducer, categoryReducer, brandReducer, headerReducer, searchReducer } from './reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    productState: productReducer,
    categoryState: categoryReducer,
    brandState: brandReducer,
    headerState: headerReducer,
    searchState: searchReducer,
});

export default rootReducer;
