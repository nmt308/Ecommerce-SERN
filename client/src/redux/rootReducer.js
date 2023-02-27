import {
    productReducer,
    categoryReducer,
    brandReducer,
    headerReducer,
    searchReducer,
    discountReducer,
    orderReducer,
    accountReducer,
    articleReducer,
} from './reducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    productState: productReducer,
    categoryState: categoryReducer,
    brandState: brandReducer,
    discountState: discountReducer,
    orderState: orderReducer,
    accountState: accountReducer,
    articleState: articleReducer,

    headerState: headerReducer,
    searchState: searchReducer,
});

export default rootReducer;
