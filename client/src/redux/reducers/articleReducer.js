const initialState = {
    articles: [],
    article: {},
    totalArticle: 1,
};

const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_ARTICLES':
            return {
                ...state,
                articles: action.payload.articles,
                totalArticle: action.payload.countAllArticle,
            };

        case 'GET_DETAIL_ARTICLE':
            return {
                ...state,
                article: action.payload,
            };
        default:
            return state;
    }
};

export default articleReducer;
