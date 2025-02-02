import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <h1 className="home-header">Find The Job That Fits Your Life</h1>
      <p className="home-para">
        Millions of people are searching for jobs,salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link className="find-jobs-li-el" to="/jobs">
        <button type="button" className="btn-el home-btn-el">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)

export default Home
