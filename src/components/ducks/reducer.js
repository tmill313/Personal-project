let initialState = {
    suggestions: [],
    newSuggestion: '',
    teams:[],
    user: {}
}

const TYPING_NEW_SUGGESTION = "TYPING_NEW_SUGGESTION"
const GET_TEAMS = "GET_TEAMS"
const GET_USER = "GET_USER"
const GET_SUGGESTIONS = "GET_SUGGESTIONS"







function reducer(state=initialState, action) {
    switch(action.type) {
        case TYPING_NEW_SUGGESTION:
        return Object.assign({}, state, {newSuggestion: action.payload})
        case GET_TEAMS:
        return Object.assign({}, state, {teams: action.payload})
        case GET_USER:
        return Object.assign({}, state, {user: action.payload})
        case GET_SUGGESTIONS:
        return Object.assign({}, state, {suggestions: action.payload})


        default: return state;
    }
}



export function typingNewSuggestion(s) {
    return {type: TYPING_NEW_SUGGESTION,
    payload: s
    }
}
export function getTeams(t) {
    return {type: GET_TEAMS,
    payload: t
    }
}
export function getUser(u) {
    return {type: GET_USER,
    payload: u
    }
}
export function getSuggestions(s) {
    return {type: GET_SUGGESTIONS,
    payload: s
    }
}
export default reducer