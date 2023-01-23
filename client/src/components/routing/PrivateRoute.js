import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, auth: { isAuthenticated, loading } }) => {
    return (isAuthenticated && !loading)
        ? children
        : <Navigate to='/login' />
}
    
PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)