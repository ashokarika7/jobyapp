import './index.css'
import {BsFillStarFill} from 'react-icons/bs'
import {IoLocation} from 'react-icons/io5'
import {IoMdBriefcase} from 'react-icons/io'
import {FaExternalLinkAlt} from 'react-icons/fa'

const JobDetailsItemRoute = props => {
  const {jobDetails} = props

  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,

    jobDescription,
    lifeAtCompany,
    location,
    packagePerAnnum,
    rating,
    title,
    skills,
  } = jobDetails

  return (
    <div className="JobDetailsItemRoute-container">
      <div className="logo-job-rating-contianer">
        <img
          className="company-log-img"
          alt="job details company logo"
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
      <div className="description-visit-container">
        <h1 className="description">Description</h1>
        <a className="visit-li-el" href={companyWebsiteUrl}>
          Visit
          <span className="link-icon">
            <FaExternalLinkAlt />
          </span>
        </a>
      </div>
      <p className="job-description">{jobDescription}</p>
      {/* skills */}
      <h1 className="skills-title">Skills</h1>
      <ul className="skills-ul-container">
        {skills.map(eachItem => (
          <li className="skills-li-container">
            <img
              className="skills-img"
              alt={eachItem.name}
              src={eachItem.image_url}
            />
            <p className="skills-name">{eachItem.name}</p>
          </li>
        ))}
      </ul>
      {/* life at company */}
      <div className="life-at-company-container">
        <h1 className="lifeAtCompany-title">Life at Company</h1>
        <div className="img-description-container">
          <p className="lifeAtCompany-para">{lifeAtCompany.description}</p>
          <img
            alt="life at company"
            className="lifeAtCompany-img"
            src={lifeAtCompany.image_url}
          />
        </div>
      </div>
    </div>
  )
}

export default JobDetailsItemRoute
