import {
    productReducer,
    categoryReducer,
    brandReducer,
    headerReducer,
    searchReducer,
    discountReducer,
} from './reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    productState: productReducer,
    categoryState: categoryReducer,
    brandState: brandReducer,
    discountState: discountReducer,

    headerState: headerReducer,
    searchState: searchReducer,
});

export default rootReducer;
