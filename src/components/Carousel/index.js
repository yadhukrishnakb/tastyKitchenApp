import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Carousel extends Component {
  state = {apiStatus: apiStatusConstants.inProgress, carouselData: []}

  componentDidMount() {
    this.getCarouselData()
  }

  getCarouselData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.offers.map(eachObj => ({
        imageUrl: eachObj.image_url,
        id: eachObj.id,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        carouselData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  reloadCarousel = () => {
    this.getCarouselData()
  }

  renderCarousel = () => {
    const {carouselData} = this.state

    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    }

    return (
      <Slider {...settings}>
        {carouselData.map(eachItem => (
          <div className="carousel-item" key={eachItem.id}>
            <img
              src={eachItem.imageUrl}
              className="carousel-image"
              alt="offer"
            />
          </div>
        ))}
      </Slider>
    )
  }

  renderLoader = () => (
    <div
      className="carousel-loader-container"
      data-testid="restaurants-offers-loader"
    >
      <Loader type="Oval" color="#F7931E" height="32" width="32" />
    </div>
  )

  renderFailure = () => (
    <div className="failure-container">
      <button
        onClick={this.reloadCarousel}
        type="button"
        className="reload-btn"
      >
        Reload
      </button>
    </div>
  )

  renderContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCarousel()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return this.renderContent()
  }
}

export default Carousel
