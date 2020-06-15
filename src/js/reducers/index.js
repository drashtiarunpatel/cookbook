import * as actionCreator from '../actions';

const initialState = {
    recipeList: [],
    addEditMode: 'add',
    recipeDetail: {},
    ratingData: [],
    modalShow: false,
    modalText: '',
    modalNavlink: '',
    loader: false
}

const cookbook = (state = initialState, action) => {
    switch (action.type) {
        case actionCreator.GETRECIPELIST:
            return {
                ...state,
                recipeList: action.recipeList
            }
        case actionCreator.CREATENEWRECIPE:
            return {
                ...state,
                recipeList: action.recipeList,
            }
        case actionCreator.GETRECIPE:
            return {
                ...state,
                recipeDetail: action.recipeDetail
            }
        case actionCreator.ADDRATING:
            return {
                ...state,
                ratingData: action.ratingData
            }
        case actionCreator.CHANGEMODE:
            return {
                ...state,
                addEditMode: action.mode
            }
        case actionCreator.SETMODALPARAMS:
            return {
                ...state,
                modalShow: action.modalShow,
                modalText: action.modalText,
                modalNavlink: action.modalNavlink
            }
        case actionCreator.LOADERSTATUS:
            return {
                ...state,
                loader: action.loader
            }
        default:
            return {
                ...state
            }
    }
};

// const reducers = {
//     cookbook,
// };

export default cookbook;