import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'



export class News extends Component {
  static propDefault = {
    pageSize: 6,
    country: 'in'
  }
  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string
  }
  constructor() {
    super();
    this.state = {
      article: [],
      loading: true,
      page: 1,
      totalResult: 1,
      error: null,
    };
  }

  async componentDidMount() {
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9225e6d8b8c04de6b9b4d0aaf3d213cc&page=1&pageSize=${this.props.pageSize}`;
      this.setState({
        loading: true
      })
      let data = await fetch(url);
      // if(data.status >= 400  && data.status <= 600) throw data;
      let parsedData = await data.json();
      this.setState({
        article: parsedData.articles,
        totalResult: parsedData.totalResults,
        loading: false,
      });
    } catch (e) {
      this.setState({
        ...this.state,
        error: e.message,
        loading: false
      });
    }
  }

  // handles the previous button.
  handlePrevCase = async () => {
    try {
      //! here we are adding 1 to the page so that we can jump to the next page.
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9225e6d8b8c04de6b9b4d0aaf3d213cc&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      this.setState({
        loading: true
      })
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        article: parsedData.articles,
        //! here this will update the value of page
        page: this.state.page - 1,
        loading: false,
      });
    } catch (e) {
      console.log("something went wrong");
    }
  }
  handleNextCase = async () => {
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9225e6d8b8c04de6b9b4d0aaf3d213cc&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({
        loading: true
      })
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        article: parsedData.articles,
        loading: false,
        page: this.state.page + 1
      })

    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <div className="container">
        <h2 className="text-center">NewsMonkey - Top News</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {/* using map function of array collection to iterate the array and fetch all the data from it.
                        a function must be passed as a parameter to the map funtion so we created an arrow function. */}

          {!this.state.error &&
            this.state.article.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  {/* using slice method to restrict the number of characters on the card */}
                  <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                </div>
              )
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevCase}>&larr; Previous </button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResult / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextCase}> Next &rarr;</button>
          {/* {JSON.stringify(this.state.error)} */}
        </div>
      </div>
    );
  }
}
export default News;
