import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile, getCurrentProfile } from '../../actions/profile'
import { Link, useNavigate } from 'react-router-dom'

const EditProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile }) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    })

    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;

    const [displaySocialInputs, toggleSocialInputs] = useState(false)

    const formHandler = e => setFormData({...formData, [e.target.name]: e.target.value})

    const submitHandler = (e) => {
        e.preventDefault()

       createProfile(formData, navigate, true)
    }

    useEffect(() => {
        getCurrentProfile()

        setFormData({
            company: loading || !profile.company? '' : profile.company,
            website: loading || !profile.website? '' : profile.website,
            location: loading || !profile.location? '' : profile.location,
            status: loading || !profile.status? '' : profile.status,
            skills: loading || !profile.skills? '' : profile.skills,
            githubusername: loading || !profile.githubusername? '' : profile.githubusername,
            bio: loading || !profile.bio? '' : profile.bio,
            twitter: loading || !profile.social || !profile.social[0].twitter? '' : profile.social[0].twitter,
            facebook: loading || !profile.social  || !profile.social[0].facebook? '' : profile.social[0].facebook,
            linkedin: loading || !profile.social || !profile.social[0].linkedin? '' : profile.social[0].linkedin,
            youtube: loading || !profile.social  || !profile.social[0].youtube? '' : profile.social[0].youtube,
            instagram: loading || !profile.social  || !profile.social[0].instagram? '' : profile.social[0].instagram,
        })
    }, [loading, getCurrentProfile])
    

  return (
    <>
      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => submitHandler(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={e => formHandler(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={company} onChange={e => formHandler(e)} />
          <small className="form-text"
            >Could be your own company or one you work for</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={e => formHandler(e)} />
          <small className="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e => formHandler(e)} />
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={e => formHandler(e)} />
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername} onChange={e => formHandler(e)}
          />
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username</small
          >
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => formHandler(e)} ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {
            displaySocialInputs && <>
                <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => formHandler(e)} />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => formHandler(e)} />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e => formHandler(e)} />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e => formHandler(e)} />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => formHandler(e)} />
                </div>
            </>
        }
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </>
  )
}

EditProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(EditProfile)