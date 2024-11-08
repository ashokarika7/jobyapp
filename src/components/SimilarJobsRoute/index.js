import './index.css'
import {BsFillStarFill} from 'react-icons/bs'
import {IoLocation} from 'react-icons/io5'
import {IoMdBriefcase} from 'react-icons/io'

const SimilarJobsRoute = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,

    jobDescription,
    location,
    rating,
    title,
  } = jobDetails
  return (
    <li className="similar-jobs-li-container">
      <div className="similar-jobs-logo-job-rating-contianer">
        <img
          className="similar-jobs-company-log-img"
          alt="similar job company logo"
          src={companyLogoUrl}
        />
        <div className="similar-jobs-title-rating-container">
          <h1 className="similar-jobs-job-title">{title}</h1>
          <div className="similar-jobs-rating-container">
            <BsFillStarFill className="jobs-star-img" />
            <p className="similar-jobs-jobs-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-jobs-description">Description</h1>
      <p className="similar-jobs-para">{jobDescription}</p>
      {/* location employment type package */}
      <div className="similar-jobs-location-employmentType-package-container">
        {/* location employment */}
        <div className="similar-jobs-location-employment-container">
          <div className="similar-jobs-location-container">
            <IoLocation className="similar-jobs-location-img" />
            <p className="similar-jobs-location-para">{location}</p>
          </div>
          <div className="similar-jobs-location-container">
            <IoMdBriefcase className="similar-jobs-location-img" />
            <p className="similar-jobs-location-para">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobsRoute
