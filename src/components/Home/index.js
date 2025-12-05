import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsFilterLeft} from 'react-icons/bs'
import {IoMdArrowDropdown} from 'react-icons/io'
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md'

import Header from '../Header'
import Carousel from '../Carousel'
import RestaurantItem from '../RestaurantItem'
import Footer from '../Footer'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    sortBy: sortByOptions[1].value,
    apiStatus: apiStatusConstants.inProgress,
    restaurantsData: {},
    activePage: 1,
    limit: 9,
    totalPages: 0,
  }

  componentDidMount() {
    this.getRestaurants()
  }

  getRestaurants = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {sortBy, activePage, limit} = this.state
    const offset = (activePage - 1) * limit

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=
    ${limit}&sort_by_rating=${sortBy}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = {
        restaurantsList: data.restaurants.map(eachItem => ({
          id: eachItem.id,
          imageUrl: eachItem.image_url,
          name: eachItem.name,
          cuisine: eachItem.cuisine,
          rating: eachItem.user_rating.rating,
          ratingColor: eachItem.user_rating.rating_color,
          ratingText: eachItem.user_rating.rating_text,
          totalReviews: eachItem.user_rating.total_reviews,
        })),
        total: data.total,
      }

      const paginationTotalPages = Math.ceil(updatedData.total / limit)

      this.setState({
        apiStatus: apiStatusConstants.success,
        restaurantsData: updatedData,
        totalPages: paginationTotalPages,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickPreviousPage = () => {
    const {activePage} = this.state

    if (activePage !== 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getRestaurants,
      )
    }
  }

  onClickNextPage = () => {
    const {activePage, totalPages} = this.state

    if (activePage !== totalPages) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.getRestaurants,
      )
    }
  }

  reloadRestaurants = () => {
    this.getRestaurants()
  }

  onChangeSortBy = event => {
    this.setState({sortBy: event.target.value}, this.getRestaurants)
  }

  renderRestaurantsList = () => {
    const {restaurantsData} = this.state
    const {restaurantsList} = restaurantsData

    return (
      <ul className="restaurants-container">
        {restaurantsList.map(eachItem => (
          <RestaurantItem data={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div
      className="restaurants-loader-container"
      data-testid="restaurants-list-loader"
    >
      <Loader type="Oval" color="#F7931E" height="32" width="32" />
    </div>
  )

  renderFailure = () => (
    <div className="restaurants-failure-container">
      <button
        onClick={this.reloadRestaurants}
        type="button"
        className="restaurants-reload-btn"
      >
        Reload
      </button>
    </div>
  )

  renderContent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantsList()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {activePage, totalPages, sortBy} = this.state

    return (
      <>
        <Header />
        <div className="home-bg-container">
          <div className="carousel-container">
            <Carousel />
          </div>
          <div className="home-content-container">
            <div className="heading-sort-options-container">
              <div>
                <h1 className="popular-restaurants-heading">
                  Popular Restaurants
                </h1>
                <p className="popular-restaurants-description">
                  Select Your favourite restaurant special dish and make your
                  day happy...
                </p>
              </div>
              <div className="filter-container">
                <BsFilterLeft className="filter-icon" />
                <select
                  value={sortBy}
                  onChange={this.onChangeSortBy}
                  className="select-option"
                >
                  {sortByOptions.map(eachItem => (
                    <option key={eachItem.id} value={eachItem.value}>
                      Sort By {eachItem.displayText}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {this.renderContent()}
            <div className="pagination-container">
              <div className="pagination">
                <button
                  data-testid="pagination-left-button"
                  onClick={this.onClickPreviousPage}
                  type="button"
                  className="pagination-btn"
                >
                  <MdKeyboardArrowLeft className="arrow-icon" />
                </button>
                <span data-testid="active-page-number" className="pages">
                  {activePage} of {totalPages}
                </span>
                <button
                  data-testid="pagination-right-button"
                  onClick={this.onClickNextPage}
                  className="pagination-btn"
                  type="button"
                >
                  <MdKeyboardArrowRight className="arrow-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
