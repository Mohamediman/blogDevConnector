import axios from 'axios'
import { setAlert } from './SetAlert'
import {
    GET_POST,
    GET_POSTS,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    ADD_COMMENT,
    REMOVE_COMMENT,
    POST_ERROR
} from './types'

//===Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('https://mern-stack-blog-miman.herokuapp.com/api/v1/post');

        dispatch({
            type: GET_POSTS,
            payload: res.data.posts
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: POST_ERROR,
            payload: err
        })
    }

}

//===Get a single post by id
export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`https://mern-stack-blog-miman.herokuapp.com/api/v1/post/${id}`);
        
        dispatch({
            type: GET_POST,
            payload: res.data.post
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: POST_ERROR,
            payload: err
        })
    }

}

//=== Add likes 
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`https://mern-stack-blog-miman.herokuapp.com/api/v1/post/like/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data.data }
        })
    } catch (err) {
        dispatch({ 
            type: POST_ERROR,
            payload: err
        })
    }

}

//=== Unlike post 
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`https://mern-stack-blog-miman.herokuapp.com/api/v1/post/unlike/${id}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data.data }
        })
    } catch (err) {
        console.log(err)
        dispatch({
            type: POST_ERROR,
            payload: err
        })
    }

}

//====Delete Post
export const deletePost = id => async dispatch => {
    try {
       await axios.delete(`https://mern-stack-blog-miman.herokuapp.com/api/v1/post/${id}`);
        dispatch({
            type: DELETE_POST,
            payload: id
        })

        dispatch(setAlert('Post removed', 'success'));

    } catch (err) {
        console.log(err)
        dispatch({
            type: POST_ERROR,
            payload: err
        })
    }
}

///=== Add post
export const addPost = formData => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
       const res = await axios.post(`https://mern-stack-blog-miman.herokuapp.com/api/v1/post`, formData, config);
       
        dispatch({
            type: ADD_POST,
            payload: res.data.post
        })

        dispatch(setAlert('Post created', 'success'));

    } catch (err) {
        console.log(err)
        dispatch({
            type: POST_ERROR,
            payload: err
        })
    }
}

///=== Add Comment(Review) to a post
export const addComment = (id, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
       const res = await axios.post(`https://mern-stack-blog-miman.herokuapp.com/api/v1/post/comment/${id}`, formData, config);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data.newComment
        })
     dispatch(setAlert('Comment added', 'success'));
    } catch (err) {
        console.log(err)
        dispatch({
            type: POST_ERROR,
            payload: err
        })
    }
}


///=== Delete Comment(Review) to a post
export const deleteComment = (postId, commentId) => async dispatch => {
    try {
        await axios.delete(`https://mern-stack-blog-miman.herokuapp.com/api/v1/post/comment/${postId}/${commentId}`);
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })

        dispatch(setAlert('Comment deleted', 'success'));

    } catch (err) {
        console.log(err)
        dispatch({
            type: POST_ERROR,
            payload: err
        })
    }
}