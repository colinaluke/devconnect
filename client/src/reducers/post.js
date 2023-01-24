import {
    GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, REMOVE_LIKES, GET_POST, ADD_COMMENT, REMOVE_COMMENT
} from '../actions/constants'

const initialState = {
    posts: [],
    post: null,
    loading: true, 
    error: {}
}

const post = (state = initialState, action) => {
    const { type, payload } = action 

    switch(type) {
        case GET_POSTS:
            return {
                ...state, 
                posts: payload,
                loading: false
            }
        case GET_POST:
            return {
                ...state, 
                post: payload, 
                loading: false
            }
        case ADD_POST:
            return {
                ...state, 
                posts: [payload, ...state.posts],
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload, 
                loading: false
            }
        case UPDATE_LIKES:
            return {
                ...state, 
                posts: state.posts.map(post => (
                    post.id === payload.id 
                        ? { ...post, like: [...post.like, payload.likes] }
                        : post
                )),
                loading: false
            }
        case REMOVE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post => (
                    post.id === payload.id
                        ? { ...post, like: post.like.filter(like => like.id !== payload.likes)}
                        : post
                ))
            }
        case DELETE_POST: 
            return {
                ...state, 
                posts: state.posts.filter(post => post.id !== payload),
                loading: false
            }
        case ADD_COMMENT:
            return {
                ...state, 
                post: { ...state.post, comment: [payload, ...state.post.comment] },
                loading: false
            }
        case REMOVE_COMMENT:
            return {
                ...state, 
                post: { ...state.post, comment: state.post.comment.filter(comment => comment.id !== payload)},
                loading: false
            }
        default: 
            return state
    }
}

export default post 