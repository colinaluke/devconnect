import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, DELETE_FROM_PROFILE } from "../actions/constants"

const initialState = {
    profile: null, 
    profiles: [],
    repos: [],
    loading: true, 
    error: {}
}

const profile = (state = initialState, action) => {
    const { type, payload } = action 

    switch(type) {
        case GET_PROFILE:
            return {
                ...state, 
                profile: payload,
                loading: false, 
            }
        case UPDATE_PROFILE:
            return {
                ...state, 
                profile: {
                    ...state.profile, 
                    [payload.name] : [payload.data]
                },
                loading: false, 
            }
        case DELETE_FROM_PROFILE:
            let prof = {
                ...state.profile,
                [payload.name]: state.profile[payload.name].filter(x => x.id !== payload.id)
            }

            return {
                ...state, 
                profile: prof,
                loading: false, 
            }
        case PROFILE_ERROR:
            return {
                ...state, 
                error: payload, 
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state, 
                profile: null, 
                repos: [],
                loading: false
            }
        default: 
            return state
    }
}

export default profile