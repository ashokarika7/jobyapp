import './index.css'
import {BsFillStarFill} from 'react-icons/bs'
import {IoLocation} from 'react-icons/io5'
import {IoMdBriefcase} from 'react-icons/io'
import {Link} from 'react-router-dom'

const JobsItemRoute = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="jobs-li-intem">
      <li className="jobsItem-li-container">
        <div className="logo-job-rating-contianer">
          <img
            className="company-log-img"
            alt="company logo"
            src={companyLogoUrl}
          />
          <div className="title-rating-container">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <BsFillStarFill className="jobs-star-img" />
              <p className="jobs-rating">{rating}</p>
            </div>
          </div>
        </div>
        {/* location employment type package */}
        <div className="location-employmentType-package-container">
          {/* location employment */}
          <div className="location-employment-container">
            <div className="location-container">
              <IoLocation className="location-img" />
              <p className="location-para">{location}</p>
            </div>
            <div className="location-container">
              <IoMdBriefcase className="location-img" />
              <p className="location-para">{employmentType}</p>
            </div>
          </div>

          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="description">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsItemRoute
