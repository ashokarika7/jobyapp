import './index.css'
import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FiltersGroup from '../FiltersGroup'
import JobsItemRoute from '../JobsItemRoute'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'LOADING',
}

class JobsRoute extends Component {
  state = {
    employmentType: [],
    salary: '',
    searchVal: '',
    jobsList: [],
    apiConstants: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    const {searchVal, employmentType, salary} = this.state
    this.setState({apiConstants: apiStatusConstants.inProgress})

    const url = `https://apis.ccbp.in/jobs?search=${searchVal}&minimum_package=${salary}&employment_type=${employmentType}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.jobs.map(job => ({
        id: job.id,
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiConstants: apiStatusConstants.success,
      })
    } else {
      this.setState({apiConstants: apiStatusConstants.failure})
    }
  }

  updateEmploymentType = val => {
    const {employmentType} = this.state
    if (employmentType.includes(val)) {
      const filteredList = employmentType.filter(item => item !== val)
      this.setState({employmentType: filteredList}, this.getJobs)
    } else {
      this.setState({employmentType: [...employmentType, val]}, this.getJobs)
    }
  }

  updateSalaryRange = val => {
    this.setState({salary: val}, this.getJobs)
  }

  onChangeSearchVal = event => {
    this.setState({searchVal: event.target.value})
  }

  onClickSearchVal = async () => {
    this.getJobs()
  }

  renderSearchVal = () => (
    <>
      <input
        onChange={this.onChangeSearchVal}
        placeholder="Search"
        className="search-el"
        type="search"
      />
      <button
        onClick={this.onClickSearchVal}
        className="btn-el search-btn-el"
        aria-label="search"
        type="button"
        data-testid="searchButton"
      >
        <BsSearch className="search-icon" />
      </button>
    </>
  )

  renderNoJobsView = () => (
    <div className="jobsList-failure-view-container">
      <img
        className="jobs-list-failure-img"
        alt="no jobs"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      />
      <h1 className="jobs-list-failure-heading">No Jobs Found</h1>
      <p className="jobs-list-failure-para">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderSuccessView = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return this.renderNoJobsView()
    }
    return (
      <ul className="jobsList-ul-container">
        {jobsList.map(eachJob => (
          <JobsItemRoute jobDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
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
        We cannot seem to find the page you are looking for.
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

  renderJobsListCheck = () => {
    const {apiConstants} = this.state
    switch (apiConstants) {
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
    const {employmentTypesList, salaryRangesList} = this.props

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="search-container-sm">{this.renderSearchVal()}</div>
          <FiltersGroup
            employmentTypesList={employmentTypesList}
            updateEmploymentType={this.updateEmploymentType}
            salaryRangesList={salaryRangesList}
            updateSalaryRange={this.updateSalaryRange}
          />
          <div className="search-display-container">
            <div className="search-container-large">
              {this.renderSearchVal()}
            </div>
            {this.renderJobsListCheck()}
          </div>
        </div>
      </>
    )
  }
}

export default JobsRoute
