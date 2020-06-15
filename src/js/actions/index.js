import axios from '../../axios';

export const GETRECIPELIST = 'GETRECIPELIST';
export const GETRECIPE = 'GETRECIPE';
export const CREATENEWRECIPE = 'CREATENEWRECIPE';
export const UPDATERECIPE = 'UPDATERECIPE';
export const DELETERECIPE = 'DELETERECIPE';
export const ADDRATING = 'ADDRATING';
export const SETMODALPARAMS = 'SETMODALPARAMS';
export const CHANGEMODE = 'CHANGEMODE';
export const LOADERSTATUS = 'LOADERSTATUS';

export const setLoader = status => {
    return {
        type: LOADERSTATUS,
        loader: status
    }
}

export const fillRecipeList = recipeList => {
    return {
        type: GETRECIPELIST,
        recipeList: recipeList
    }
}

export const recipeDetail = data => {
    return {
        type: GETRECIPE,
        recipeDetail: data
    }
}

export const recipeRating = (ratingData) => {
    return {
        type: ADDRATING,
        ratingData: ratingData
    }
}

export const addNewRecipe = (recipeList) => {
    return {
        type: CREATENEWRECIPE,
        recipeList: recipeList,
    }
}

export const removeRecipe = recipeId => {
    return {
        type: DELETERECIPE,
        recipeId: recipeId
    }
}
export const setModalParams = (modalShow, modalText, modalNavlink) => {
    return {
        type: SETMODALPARAMS,
        modalShow: modalShow,
        modalText: modalText,
        modalNavlink: modalNavlink
    }
}
export const changeMode = (mode) => {
    return {
        type: CHANGEMODE,
        mode: mode
    }
}

export const getRecipeList = (offset, recipeList) => {
    return dispatch => {
        dispatch(setLoader(true));
        axios.get('api/v1/recipes?limit=10&offset=' + offset)
            .then(response => {
                let recipeListCopy = [...recipeList];
                response.data.map(data => {
                    recipeListCopy.push(data);
                    return recipeListCopy;
                })
                dispatch(fillRecipeList(recipeListCopy));
                dispatch(setLoader(false));
            })
            .catch(error => {
                dispatch(setModalParams(true, 'Error while fetching recipes. Reason:' + error.response.data.message))
                dispatch(setLoader(false));
            })
    }
}

export const getRecipe = recipeId => {
    return dispatch => {
        dispatch(setLoader(true));
        axios.get('api/v1/recipes/' + recipeId)
            .then(response => {
                dispatch(recipeDetail(response.data));
                dispatch(setLoader(false));
            })
            .catch(error => {
                dispatch(setModalParams(true, 'Error occured while fetching recipe details. Reason' + error.response.data.message));
                dispatch(setLoader(false));
            })
    }
}

export const addRating = (ratingData, recipeId, rating) => {
    return dispatch => {
        dispatch(setLoader(true));
        axios.post('api/v1/recipes/' + recipeId + '/ratings', { score: rating })
            .then(() => {
                let ratingDataCopy = [...ratingData];
                ratingDataCopy.push({ id: recipeId, score: rating });
                dispatch(recipeRating(ratingDataCopy));
                dispatch(setModalParams(true, 'Rating added successfully!'));
                dispatch(setLoader(false));
            })
            .catch(error => {
                dispatch(setModalParams(true, 'Error occurred while submitting the rating. Reason:' + error.response.data.message));
                dispatch(setLoader(false));
            })
    }
}

export const createNewRecipe = (data, recipeList) => {
    return dispatch => {
        dispatch(setLoader(true));
        axios.post('api/v1/recipes/', data)
            .then(response => {
                dispatch(recipeDetail(response.data));
                dispatch(changeMode("edit"));
                dispatch(setModalParams(true, 'New Recipe of ' + data.name + ' added successfully', 'details'));
                dispatch(setLoader(false));
            })
            .catch(error => {
                dispatch(addNewRecipe(recipeList));
                dispatch(setModalParams(true, 'Error occured while adding new recipe of ' + data.name + '. Reason: ' + error.response.data.message));
                dispatch(setLoader(false));
            })
    }
}

export const deleteRecipe = recipeId => {
    return dispatch => {
        dispatch(setLoader(true));
        axios.delete('api/v1/recipes/' + recipeId)
            .then(() => {
                dispatch(recipeDetail({}));
                dispatch(setModalParams(true, "Recipe Deleted Successfully!", "/"));
                dispatch(setLoader(false));
            })
            .catch(error => {
                dispatch(setModalParams(true, "Error occured while deleting recipe. Reason: " + error.response.data.message));
                dispatch(setLoader(false));
            })
    }
}
export const updateRecipe = (recipeId, data, recipeList) => dispatch => {
    dispatch(setLoader(true));
    axios.put('api/v1/recipes/' + recipeId, data)
        .then(() => {
            data.id = recipeId;
            dispatch(recipeDetail(data));
            dispatch(setModalParams(true, "Recipe Updated Successfully!", "details"));
            dispatch(setLoader(false));
        })
        .catch(error => {
            dispatch(setModalParams(true, "Error occured while updating recipe. Reason: " + error.response.data.message));
            dispatch(setLoader(false));
        })
}