import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

const apiConstantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'LOADING',
}

class FiltersGroup extends Component {
  state = {profileDetails: {}, apiConstants: apiConstantStatus.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiConstants: apiConstantStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        profileDetails: updatedData,
        apiConstants: apiConstantStatus.success,
      })
    } else {
      this.setState({apiConstants: apiConstantStatus.failure})
    }
  }

  renderSuccessProfile = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div
      className="loader-container profile-loading-container"
      data-testid="loader"
    >
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileFailureView = () => (
    <div className="profile-failure-container">
      <button
        onClick={this.getProfileDetails}
        type="button"
        className="btn-el profile-btn"
      >
        Retry
      </button>
    </div>
  )

  ProfileDetailsCheck = () => {
    const {apiConstants} = this.state
    switch (apiConstants) {
      case apiConstantStatus.success:
        return this.renderSuccessProfile()
      case apiConstantStatus.inProgress:
        return this.renderLoadingView()
      case apiConstantStatus.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  onChangeEmployment = event => {
    const {updateEmploymentType} = this.props
    updateEmploymentType(event.target.value)
  }

  renderEmploymentType = () => {
    const {employmentTypesList} = this.props

    return (
      <div className="employment-type-container">
        <h1 className="employment-type-title">Type of Employment</h1>
        <div className="employment-input-el-container">
          {employmentTypesList.map(item => (
            <div className="emplyment-input-label-container">
              <input
                onChange={this.onChangeEmployment}
                type="checkbox"
                id={item.employmentTypeId}
                value={item.employmentTypeId}
              />
              <label
                className="employment-type-label"
                htmlFor={item.employmentTypeId}
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    )
  }

  onChangeSalary = event => {
    const {updateSalaryRange} = this.props
    updateSalaryRange(event.target.value)
  }

  renderSalaryRange = () => {
    const {salaryRangesList} = this.props

    return (
      <div className="employment-type-container">
        <h1 className="employment-type-title">Salary Range</h1>
        <div className="employment-input-el-container">
          {salaryRangesList.map(item => (
            <div className="emplyment-input-label-container">
              <input
                onChange={this.onChangeSalary}
                type="radio"
                id={item.salaryRangeId}
                value={item.salaryRangeId}
                name="salary"
              />
              <label
                className="employment-type-label"
                htmlFor={item.salaryRangeId}
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="filters-container">
        {this.ProfileDetailsCheck()}
        <hr className="hr-el" />
        {this.renderEmploymentType()}
        <hr className="hr-el" />
        {this.renderSalaryRange()}
      </div>
    )
  }
}

export default FiltersGroup
