import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const statusOfComponent = ['LOADING', 'SUCCESS', 'FAILED']

class ProfileDetails extends Component {
  state = {isFailed: statusOfComponent[0], profileInfo: ''}

  componentDidMount() {
    this.getProfileInformation()
  }

  getProfileInformation = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const details = await data.profile_details
    const convertedDetails = {
      name: details.name,
      profileImageUrl: details.profile_image_url,
      shortBio: details.short_bio,
    }
    if (response.ok === true) {
      this.setState({isFailed: 'SUCCESS', profileInfo: convertedDetails})
    } else {
      this.setState({isFailed: 'FAILED'})
    }
  }

  onSuccessfulAPI = () => {
    const {profileInfo} = this.state
    const {name, profileImageUrl, shortBio} = profileInfo

    return (
      <div className="profile-bg-container">
        <img src={profileImageUrl} alt="profile" className="profile-icon" />
        <h1 className="heading">{name}</h1>
        <p className="description">{shortBio}</p>
      </div>
    )
  }

  onFailedAPICall = () => (
    <div className="failed-View">
      <button type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  onLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {isFailed} = this.state
    switch (isFailed) {
      case 'LOADING':
        return this.onLoadingView()
      case 'SUCCESS':
        return this.onSuccessfulAPI()
      case 'FAILED':
        return this.onFailedAPICall()
      default:
        return null
    }
  }
}

export default ProfileDetails
