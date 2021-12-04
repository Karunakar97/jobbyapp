import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const routeToJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home-bg-container some">
        <div>
          <h1 className="find-job-head">
            Find The Job <br />
            That Fits Your Life
          </h1>
          <p className="find-job-para">
            Millions of people are searching for jobs, <br />
            salary information, company reviews. Find the job that fits your
            <br />
            abilities and potential.
          </p>
          <Link to="/jobs">
            <button
              type="button"
              className="find-jobs-button"
              onClick={routeToJobs}
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
