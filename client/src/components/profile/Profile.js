import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfileById } from '../../actions/profile'
import { Link, useParams } from 'react-router-dom'

const Profile = ({ profile: { profile, loading }, auth, getProfileById }) => {
    const { id } = useParams()
    useEffect(() => {
        getProfileById(id)
    }, [])

  return <>
    {profile === null || loading
        ? <Spinner/> 
        : <>
            <Link to='/profiles' className='btn btn-light'>
                Back to Profiles
            </Link>
            {auth.isAuthenticated && !auth.loading && auth.user.id === profile.userId &&
                (<Link to='/edit-profile' className='btn btn-dark'>
                    Edit Profile
                </Link>)

            }
        </>
    }
  </>
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile)
