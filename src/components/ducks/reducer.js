let initialState = {
    suggestions: [],
    newSuggestion: '',
    teams:[],
    user: {
        voted: []
    },
    team: [],
    teamSuggestions: [],
    modalProps: null
}

const TYPING_NEW_SUGGESTION = "TYPING_NEW_SUGGESTION"
const GET_TEAMS = "GET_TEAMS"
const GET_USER = "GET_USER"
const GET_SUGGESTIONS = "GET_SUGGESTIONS"
const GET_TEAM = "GET_TEAM"
const GET_TEAM_SUGGESTIONS = "GET_TEAM_SUGGESTIONS"
const MODAL_OPEN = "MODAL_OPEN"
const MODAL_CLOSE = "MODAL_CLOSE"






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
        case GET_TEAM:
        return Object.assign({}, state, {team: action.payload})
        case GET_TEAM_SUGGESTIONS:
        return Object.assign({}, state, {teamSuggestions: action.payload})
        case MODAL_OPEN:
        return Object.assign({}, state, {modalProps: action.payload})
        case MODAL_CLOSE:
        return Object.assign({}, state, {modalProps: null})


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
export function getTeam(t) {
    return {type: GET_TEAM,
    payload: t
    }
}
export function getTeamSuggestions(s) {
    return {type: GET_TEAM_SUGGESTIONS,
    payload: s
    }
}
export function openModal(m) {
    return {type: MODAL_OPEN,
    payload: m
    }
}
export function closeModal() {
    return {type: MODAL_CLOSE,
    }
}

export default reducer