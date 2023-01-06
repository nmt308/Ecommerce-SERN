import {
    productReducer,
    categoryReducer,
    brandReducer,
    headerReducer,
    searchReducer,
    discountReducer,
    orderReducer,
} from './reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    productState: productReducer,
    categoryState: categoryReducer,
    brandState: brandReducer,
    discountState: discountReducer,
    orderState: orderReducer,

    headerState: headerReducer,
    searchState: searchReducer,
});

export default rootReducer;
