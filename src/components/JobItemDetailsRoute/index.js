import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import JobDetailsItemRoute from '../JobDetailsItemRoute'
import SimilarJobsRoute from '../SimilarJobsRoute'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'LOADING',
}

class JobItemDetailsRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    similarJobsList: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: data.job_details.life_at_company,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        skills: data.job_details.skills,
      }
      const updatedSimilarJobs = data.similar_jobs.map(item => ({
        companyLogoUrl: item.company_logo_url,
        employmentType: item.employment_type,
        id: item.id,
        jobDescription: item.job_description,
        location: item.location,
        rating: item.rating,
        title: item.title,
      }))
      this.setState({
        jobDetails: updatedData,
        similarJobsList: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderSuccessView = () => {
    const {jobDetails, similarJobsList} = this.state

    return (
      <div className="success-view-container">
        <JobDetailsItemRoute jobDetails={jobDetails} />

        <h1 className="similar-jobs-title">Similar Jobs</h1>

        <ul className="similar-jobs-ul-container">
          {similarJobsList.map(item => (
            <SimilarJobsRoute key={item.id} jobDetails={item} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container jobs-list-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="jobsList-failure-view-container">
      <img
        className="jobs-list-failure-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="jobs-list-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-list-failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        onClick={this.getJobs}
        className="jobs-list-failure-btn btn-el"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailsCheck = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-details-container">
          {this.renderJobDetailsCheck()}
        </div>
      </>
    )
  }
}

export default JobItemDetailsRoute
