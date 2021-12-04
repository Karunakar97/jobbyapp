import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {HiExternalLink} from 'react-icons/hi'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'

const statusJobItemDetails = ['LOADING', 'SUCCESS', 'FAILED']

class JobItemDetails extends Component {
  state = {
    skills: [],
    lifeAtCompany: '',
    similarJobs: [],
    jobDetails: '',
    jobItemDetailsStatus: statusJobItemDetails[0],
  }

  componentDidMount() {
    this.getCompleteJobDescriptionsAPI()
  }

  getCompleteJobDescriptionsAPI = async () => {
    const {match} = this.props
    const positionId = match.params.id.substring(1)
    const Token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${positionId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const similarJobs = data.similar_jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      rating: each.rating,
      title: each.title,
    }))

    const lifeAtCompany = {
      description: data.job_details.life_at_company.description,
      imageUrl: data.job_details.life_at_company.image_url,
    }

    const skills = data.job_details.skills.map(eachSkill => ({
      imageUrlSkills: eachSkill.image_url,
      name: eachSkill.name,
    }))

    const jobDetails = data.job_details
    const details = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      title: jobDetails.title,
    }
    if (response.ok === true) {
      this.setState({
        skills: [...skills],
        lifeAtCompany,
        similarJobs: [...similarJobs],
        jobDetails: details,
        jobItemDetailsStatus: statusJobItemDetails[1],
      })
    } else {
      this.setState({jobItemDetailsStatus: statusJobItemDetails[2]})
    }
  }

  onLoadingView = () => (
    <>
      <Header />
      <div className="failedView-Bg">
        <div className="loader-container" testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      </div>
    </>
  )

  getJobDetails = () => {
    const {jobDetails, skills, lifeAtCompany} = this.state
    console.log(skills)
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany
    return (
      <>
        <div className="jobItemDetails-background">
          <div className="logo-title-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="title-rating-container">
              <h1 className="jobItemDetails-positions-title">{title}</h1>
              <div className="rating-cont">
                <AiFillStar />
                <p className="rating-para">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-package-cont">
            <div className="rating-cont">
              <div className="rating-cont">
                <MdLocationOn />
                <p className="intern-location-font">{location}</p>
              </div>
              <div className="intership-cont">
                <BsFillBriefcaseFill />
                <p className="intern-location-font">{employmentType}</p>
              </div>
            </div>
            <p className="jobItemDetails-positions-title">{packagePerAnnum}</p>
          </div>
          <hr />
          <div className="description-link-container">
            <h1 className="job-Item_details-destcription-head">Description</h1>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="anchor-El"
            >
              Visit <HiExternalLink className="anchor-El" />
            </a>
          </div>
          <p className="jobItemDetails-des-font">{jobDescription}</p>
          <h1 className="job-Item_details-destcription-head">Skills</h1>
          <ul className="skills-ul">
            {skills.map(eachSkill => (
              <li className="skills-list" key={eachSkill.id}>
                <img
                  src={eachSkill.imageUrlSkills}
                  alt={eachSkill.name}
                  className="skill-logo"
                />
                <p className="skills-para">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="job-Item_details-destcription-head">
            Life at Company
          </h1>
          <div className="life-at-comapany-cont">
            <p className="jobItemDetails-des-font">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-comapany-logo"
            />
          </div>
        </div>
      </>
    )
  }

  getSimilarJobs = () => {
    const {similarJobs} = this.state
    return (
      <>
        <ul className="similar-skills-ul">
          {similarJobs.map(eachSimilarJob => (
            <li className="similarDetails-background" key={eachSimilarJob.id}>
              <div className="logo-title-container">
                <img
                  src={eachSimilarJob.companyLogoUrl}
                  alt="similar job company logo"
                  className="company-logo"
                />
                <div className="title-rating-container">
                  <h1 className="jobItemDetails-positions-title">
                    {eachSimilarJob.title}
                  </h1>
                  <div className="rating-cont">
                    <AiFillStar />
                    <p className="rating-para">{eachSimilarJob.rating}</p>
                  </div>
                </div>
              </div>
              <h1 className="job-Item_details-destcription-head">
                Description
              </h1>
              <p className="jobItemDetails-des-font">
                {eachSimilarJob.jobDescription}
              </p>
              <div className="location-package-cont">
                <div className="rating-cont">
                  <div className="rating-cont">
                    <MdLocationOn />
                    <p className="intern-location-font">
                      {eachSimilarJob.location}
                    </p>
                  </div>
                  <div className="intership-cont">
                    <BsFillBriefcaseFill />
                    <p className="intern-location-font">
                      {eachSimilarJob.employmentType}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    )
  }

  completeComponentDetails = () => (
    <>
      <Header />
      <div className="IID-bg">
        {this.getJobDetails()}
        <h1>Similar Jobs</h1>
        {this.getSimilarJobs()}
      </div>
    </>
  )

  onFailedAPIView = () => (
    <>
      <Header />
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
          className="retry-button2"
          onClick={this.getCompleteJobDescriptionsAPI}
        >
          Retry
        </button>
      </div>
    </>
  )

  render() {
    const {jobItemDetailsStatus} = this.state

    switch (jobItemDetailsStatus) {
      case statusJobItemDetails[0]:
        return this.onLoadingView()
      case statusJobItemDetails[1]:
        return this.completeComponentDetails()
      case statusJobItemDetails[2]:
        return this.onFailedAPIView()
      default:
        return null
    }
  }
}

export default JobItemDetails
