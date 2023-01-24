import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { addLike, removeLike, deletePost } from '../../actions/post'

const PostItem = ({ addLike, removeLike, deletePost, showActions, auth, post: {
    id, text, name, avatar, userId, like, comment, date
}}) => {

  return (
    <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${userId}`}>
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
              {text}
            </p>
             <p className="post-date">
                Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>

            {showActions && (
            <>
              <button type='button' className="btn btn-light" onClick={e => addLike(id)}>
                <i className="fas fa-thumbs-up"></i>
                <span>{like.length > 0 && (
                  <span>{like.length}</span>
                )}</span>
              </button>
              <button type='button' className="btn btn-light" onClick={e => removeLike(id)}>
                  <i className="fas fa-thumbs-down"></i> {' '}
              </button>
              <Link to={`/posts/${id}`} className='btn btn-primary'>
                  Discussion {comment.length > 0 && (
                      <span className='comment-count'>{comment.length}</span>
                  )} 
              </Link>
              {!auth.loading && userId === auth.user.id && (
                  <button type="button" className="btn btn-danger" onClick={e => deletePost(id)}>
                      <i className="fas fa-times"></i>
                  </button>
              )}
            </>)}


          </div>
        </div>
  )
}

PostItem.defaultProps = {
  showActions: true
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem)