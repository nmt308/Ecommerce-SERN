import {
    productReducer,
    categoryReducer,
    brandReducer,
    headerReducer,
    searchReducer,
    discountReducer,
    orderReducer,
    accountReducer,
} from './reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    productState: productReducer,
    categoryState: categoryReducer,
    brandState: brandReducer,
    discountState: discountReducer,
    orderState: orderReducer,
    accountState: accountReducer,

    headerState: headerReducer,
    searchState: searchReducer,
});

export default rootReducer;
