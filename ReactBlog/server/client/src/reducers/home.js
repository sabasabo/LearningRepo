export default (state={articles: [], articleToEdit: undefined}, action) => {
    switch (action.type) {
        case 'HOME_PAGE_LOADED':
            return {
                ...state,
                articles: action.data.articles
            };
        case 'SUBMIT_ARTICLE':
            return {
                ...state,
                articles: [action.data.article].concat(state.articles)
            };
        case 'DELETE_ARTICLE':
            return {
                ...state,
                articles: state.articles.filter(article => article._id !== action.id)
            };
        case 'SET_EDIT':
            return {
                ...state,
                articleToEdit: action.article
            };
        case 'EDIT_ARTICLE':
            return {
                ...state,
                articles: state.articles.map(article =>
                    article._id === action.data.article._id ? action.data.article : article
                ),
                articleToEdit: undefined
            };
        default:
            return state;
    }
}
