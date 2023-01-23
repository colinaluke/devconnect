import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addExperience } from '../../actions/profile'
import { Link, useNavigate} from 'react-router-dom'

const AddExperience = ({ addExperience }) => {
    const navigate = useNavigate()
    const [toDateDisabled, toggleDisabled] = useState(false)
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false, 
        description: ''
    })

    const { company, title, location, from, to, current, description } = formData

    const formHandler = e => setFormData({...formData, [e.target.name]: e.target.value})

    const submitHandler = (e) => {
        e.preventDefault()

        addExperience(formData, navigate)
    }

    useEffect(() => {

    }, [current])

  return (
    <>
    <section className="container">
      <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" value={title} onChange={e => formHandler(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" value={company} onChange={e => formHandler(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e => formHandler(e)} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" value={from} onChange={e => formHandler(e)} />
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" checked={current} value={current} onChange={e => {
            setFormData({...formData, current: !current})
            toggleDisabled(!toDateDisabled)
          }}/> {' '} Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to} onChange={e => formHandler(e)} disabled={toDateDisabled && 'disabled' } />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description} onChange={e => formHandler(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </section>
    </>
  )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(AddExperience)
