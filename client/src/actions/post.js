import axios from 'axios'
import { setAlert } from './alert'
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST, ADD_POST, REMOVE_LIKES, GET_POST, ADD_COMMENT, REMOVE_COMMENT } from './constants'

export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/post')

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const getPost = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/post/${id}`)

        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const addLike = (id) => async dispatch => {
    try {
        const res = await axios.post(`/api/post/like/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const removeLike = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/post/unlike/${id}`)

        dispatch({
            type: REMOVE_LIKES,
            payload: { id, likes: res.data.id }
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const deletePost = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/post/${id}`)

        dispatch({
            type: DELETE_POST,
            payload: id
        })

        dispatch(setAlert('Post has been deleted', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const addPost = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/post', formData, config)

        dispatch({
            type: ADD_POST,
            payload: res.data
        })

        dispatch(setAlert('Post has been created', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const addComment = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    try {
        const res = await axios.post(`/api/post/comment/${postId}`, formData, config)

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })

        dispatch(setAlert('Comment added', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}

export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        const res = await axios.delete(`/api/post/comment/${postId}/${commentId}`)

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })

        dispatch(setAlert('Comment removed', 'success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        })
    }
}