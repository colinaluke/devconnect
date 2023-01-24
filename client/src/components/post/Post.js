import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getPost } from '../../actions/post'
import { Link, useParams } from 'react-router-dom'
import PostItem from '../posts/PostItem'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({ post: { post, loading }, getPost }) => {
    const { id } = useParams()

    useEffect(() => {
        getPost(id)
    }, [getPost])

  return loading || post === null ? <Spinner /> 
    : <>
        <Link to='/posts' className='btn'>
            Back to Posts
        </Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post.id} />
        <div className="comments">
            {post.comment.map(comment => (
                <CommentItem key={comment.id} comment={comment} postId={post.id} />
            ))}
        </div>
    </>
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    post: state.post,
})

export default connect(mapStateToProps, { getPost })(Post)