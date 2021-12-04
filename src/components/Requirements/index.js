import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import './index.css'

const statusOfJobs = ['LOADING', 'SUCCESS', 'FAILED']

class Requirements extends Component {
  onLoading = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onSuccessfulAPI = () => {
    const {JobsInfo} = this.props
    const lenghtOfJobs = JobsInfo.length
    if (lenghtOfJobs <= 0) {
      return this.noJobsFound()
    }
    return (
      <ul>
        {JobsInfo.map(eachOne => (
          <li className="jobsData-background" key={eachOne.id}>
            <Link to={`/jobs/:${eachOne.id}`} className="link">
              <div className="logo-title-container">
                <img
                  src={eachOne.companyLogoUrl}
                  alt="company logo"
                  className="company-logo"
                />
                <div className="title-rating-container">
                  <h1 className="positions-title">{eachOne.title}</h1>
                  <div className="rating-cont">
                    <AiFillStar />
                    <p className="rating-para">{eachOne.rating}</p>
                  </div>
                </div>
              </div>
              <div className="location-package-cont">
                <div className="rating-cont">
                  <div className="rating-cont">
                    <MdLocationOn />
                    <p className="intern-location-font">{eachOne.location}</p>
                  </div>
                  <div className="intership-cont">
                    <BsFillBriefcaseFill />
                    <p className="intern-location-font">
                      {eachOne.employmentType}
                    </p>
                  </div>
                </div>
                <p className="positions-title">{eachOne.packagePerAnnum}</p>
              </div>
              <hr />
              <h1 className="positions-title descritoin-head ">Description</h1>
              <p className="des-font">{eachOne.jobDescription}</p>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  onFailedAPI = () => (
    <>
      <div className="failedView-Bg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failedView-img"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button
          type="button"
          className="retry-button"
          onClick={this.reRenderJobs}
        >
          Retry
        </button>
      </div>
    </>
  )

  noJobsFound = () => (
    <div className="no-jobs-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-text">No Jobs Found</h1>
      <p className="no-jobs-text">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  render() {
    const {status} = this.props
    switch (status) {
      case statusOfJobs[0]:
        return this.onLoading()
      case statusOfJobs[1]:
        return this.onSuccessfulAPI()
      case statusOfJobs[2]:
        return this.onFailedAPI()
      case 'NOJOBS':
        return this.noJobsFound()
      default:
        return null
    }
  }
}

export default Requirements
