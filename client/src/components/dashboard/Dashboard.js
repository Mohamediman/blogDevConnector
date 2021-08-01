import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from './../layout/Spinner'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'


import { connect } from 'react-redux'
import { getCurrentProfile } from '../../actions/profile'

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {
    useEffect(() => {
        getCurrentProfile();

        // eslint-disable-next-line
    }, [])

    return (
        loading && profile === null ? <Spinner /> : <Fragment>
            <h1 className="large text-primary">Dashboard </h1>
            <p className="lead">
                <i className="fas fa-user"> Welcome { user && user.name } </i>
            </p>
            { 
            profile !== null ? <Fragment>
                    <DashboardActions /> 
                    <Experience experience={ profile.experience } />
                    <Education education={ profile.education } />
                 </Fragment> : 
                <Fragment>
                    <p>You do not have a profile. Please create a profile by adding some Info</p>
                    <Link to="/create-profile" className="btn btn-primary my-1"> Create Profile </Link>
                </Fragment> 
            }
        </Fragment>
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
