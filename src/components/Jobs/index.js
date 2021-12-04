import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import Requirements from '../Requirements'
import ProfileDetails from '../ProfileDetails'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const statusOfJobs = ['LOADING', 'SUCCESS', 'FAILED']

class Jobs extends Component {
  state = {
    salaryParams: [],
    employementParams: [],
    searchParams: '',
    status: statusOfJobs[0],
    JobsInfo: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    const {salaryParams, employementParams, searchParams} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employementParams}&minimum_package=${salaryParams}&search=${searchParams}`

    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const jobsData = data.jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      packagePerAnnum: eachJob.package_per_annum,
      rating: eachJob.rating,
      title: eachJob.title,
    }))
    if (response.ok === true) {
      this.setState({JobsInfo: jobsData, status: statusOfJobs[1]})
    } else {
      this.setState({status: statusOfJobs[2]})
    }
  }

  onClickSearchButton = () => {
    this.getJobsList()
  }

  onChangeSearchInput = event => {
    this.setState({searchParams: event.target.value})
  }

  onChangeSalary = event => {
    const newSal = event.target.value
    this.setState({salaryParams: newSal}, this.getJobsList)
  }

  onChangeEmployment = event => {
    const EmployeeId = event.target.value
    this.setState(
      prev => ({
        employementParams: [...prev.employementParams, EmployeeId],
      }),
      this.getJobsList,
    )
  }

  onFailedAPI = () => (
    <div className="failedView-Bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failedView-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="retry-button" onClick={this.getJobsList}>
        Retry
      </button>
    </div>
  )

  render() {
    const {status, JobsInfo} = this.state

    return (
      <>
        <Header />
        <div className="all-jobs-main-bg-container">
          <div className="md-lg-view-filters">
            <div className="search-input-button-cont">
              <input
                type="search"
                placeholder="Search"
                className="search-input-el"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                testid="searchButton"
                className="search-button"
                onClick={this.onClickSearchButton}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="profile-details-container">
              <ProfileDetails />
            </div>
            <div>
              <hr />
            </div>
            <div>
              <h1 className="filters-para">Type of Employment</h1>
              <ul className="filters-ul">
                {employmentTypesList.map(each => (
                  <li key={each.label} className="filter-list-el">
                    <input
                      type="checkbox"
                      id={each.employmentTypeId}
                      value={each.employmentTypeId}
                      onChange={this.onChangeEmployment}
                    />
                    <label htmlFor={each.employmentTypeId} className="label-el">
                      {each.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <hr />
            </div>
            <div>
              <h1 className="filters-para">Salary Range</h1>
              <ul className="filters-ul">
                {salaryRangesList.map(eachRange => (
                  <li key={eachRange.label} className="filter-list-el">
                    <input
                      type="radio"
                      id={eachRange.salaryRangeId}
                      value={eachRange.salaryRangeId}
                      onChange={this.onChangeSalary}
                    />
                    <label
                      htmlFor={eachRange.salaryRangeId}
                      className="label-el"
                    >
                      {eachRange.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="requirements-cont-lg-view">
            <Requirements
              status={status}
              JobsInfo={JobsInfo}
              getJobsList={this.getJobsList}
            />
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
